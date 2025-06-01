<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Prijava;
use App\Models\Korisnik;
use App\Models\Izlozba;
use Illuminate\Support\Str;
use App\Mail\PotvrdaPrijaveMail;
use Illuminate\Support\Facades\Mail;
use BaconQrCode\Writer;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;

class PrijavaController extends Controller
{
    // Prikaz svih prijava
    public function index()
    {
        return response()->json(Prijava::all(), 200);
    }

    // Kreiranje nove prijave
    public function store(Request $request)
    {
        if (auth()->user()->uloga !== 'posetilac') {
            return response()->json(['poruka' => 'Samo posetilac može da se prijavi.'], 403);
        }

        $validated = $request->validate([
            'korisnik_id' => 'required|exists:korisnici,id',
            'izlozba_id' => 'required|exists:izlozbe,id',
        ]);

        $validated['datum_prijave'] = now()->toDateString();
        $validated['qr_kod'] = Str::uuid();

        $prijava = Prijava::create($validated);

        // Dohvati korisnika i izložbu
        $korisnik = Korisnik::find($validated['korisnik_id']);
        $izlozba = Izlozba::find($validated['izlozba_id']);

        // Generisanje QR koda
        $renderer = new ImageRenderer(
            new RendererStyle(200),
            new SvgImageBackEnd()
        );
        $writer = new Writer($renderer);
        $image = $writer->writeString($prijava->qr_kod);
        $qrKodBase64 = base64_encode($image);

        // Mejl sa QR kodom
        Mail::to($korisnik->email)->send(
            new PotvrdaPrijaveMail($prijava, $korisnik, $izlozba, $qrKodBase64)
        );

        return response()->json($prijava, 201);
    }

    // Prikaz jedne prijave
    public function show($id)
    {
        $prijava = Prijava::find($id);

        if (!$prijava) {
            return response()->json(['message' => 'Prijava nije pronađena.'], 404);
        }

        return response()->json($prijava, 200);
    }

    // Ažuriranje prijave
    public function update(Request $request, $id)
    {
        $prijava = Prijava::find($id);
        if (!$prijava) {
            return response()->json(['error' => 'Prijava nije pronađena.'], 404);
        }

        $validated = $request->validate([
            'korisnik_id' => 'sometimes|exists:korisnici,id',
            'izlozba_id' => 'sometimes|exists:izlozbe,id',
            'datum_prijave' => 'required|date'
        ]);

        $prijava->update($validated);

        return response()->json($prijava);
    }

    // Brisanje prijave
    public function destroy($id)
    {
        if (!in_array(auth()->user()->uloga, ['posetilac', 'administrator'])) {
            return response()->json(['poruka' => 'Nemate dozvolu za brisanje.'], 403);
        }

        $prijava = Prijava::find($id);

        if (!$prijava) {
            return response()->json(['message' => 'Prijava nije pronađena.'], 404);
        }

        $prijava->delete();

        return response()->json(null, 204);
    }

    // Ažuriranje datuma svih prijava za izložbu
    public function azurirajDatumeZaIzlozbu(Request $request, $id)
    {
        $request->validate([
            'datum_prijave' => 'required|date',
        ]);

        $brojAzuriranih = Prijava::where('izlozba_id', $id)
            ->update(['datum_prijave' => $request->datum_prijave]);

        return response()->json([
            'message' => "Ažurirano $brojAzuriranih prijava za izložbu sa ID $id.",
        ]);
    }
}
