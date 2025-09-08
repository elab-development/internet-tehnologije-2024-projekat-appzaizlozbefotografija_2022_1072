<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

use App\Models\Prijava;
use App\Models\Korisnik;
use App\Models\Izlozba;

use App\Mail\PotvrdaPrijaveMail;

use BaconQrCode\Writer;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;

class PrijavaController extends Controller
{
    // Prikaz svih prijava (sa relacijama radi uvida)
    public function index()
    {
        $prijave = Prijava::with(['korisnik', 'izlozba'])->get();
        return response()->json($prijave, 200);
    }

    // Kreiranje nove prijave
    public function store(Request $request)
    {
        if (!auth()->check() || auth()->user()->uloga !== 'posetilac') {
            return response()->json(['poruka' => 'Samo posetilac može da se prijavi.'], 403);
        }

        $validated = $request->validate([
            'korisnik_id' => 'required|exists:korisnici,id',
            'izlozba_id'  => 'required|exists:izlozbe,id',
        ]);

        try {
            $rezultat = DB::transaction(function () use ($validated) {
                // Zaključaj izložbu pre umanjenja
                /** @var Izlozba $izlozba */
                $izlozba = Izlozba::where('id', $validated['izlozba_id'])
                    ->lockForUpdate()
                    ->firstOrFail();

                if (($izlozba->dostupnaMesta ?? 0) <= 0) {
                    return ['status' => 422, 'body' => ['poruka' => 'Nema više slobodnih mesta.']];
                }

                // Kreiraj prijavu
                $data = $validated;
                $data['datum_prijave'] = now()->toDateString();
                $data['qr_kod'] = Str::uuid();
                $prijava = Prijava::create($data);

                // Umanji broj slobodnih mesta
                $izlozba->decrement('dostupnaMesta');

                // QR kod (SVG)
                $renderer = new ImageRenderer(
                    new RendererStyle(200),
                    new SvgImageBackEnd()
                );
                $writer = new Writer($renderer);
                $svgBinary = $writer->writeString($prijava->qr_kod);
                $qrKodBase64 = base64_encode($svgBinary);

                // Pošalji mejl (ne ruši tok ako padne)
                try {
                    $korisnik = Korisnik::find($validated['korisnik_id']);
                    Mail::to($korisnik->email)->send(
                        new PotvrdaPrijaveMail($prijava, $korisnik, $izlozba, $qrKodBase64)
                    );
                    $poruka = 'Uspešno rezervisano. Potvrda je poslata na mejl.';
                } catch (\Throwable $mailEx) {
                    \Log::error('Slanje maila neuspešno: '.$mailEx->getMessage(), [
                        'trace' => $mailEx->getTraceAsString(),
                    ]);
                    $poruka = 'Rezervacija sačuvana, ali slanje mejla trenutno nije uspelo.';
                }

                return ['status' => 201, 'body' => [
                    'poruka'         => $poruka,
                    'prijava'        => $prijava,
                    'preostaloMesta' => $izlozba->dostupnaMesta, // posle decrement-a
                ]];
            });

            return response()->json($rezultat['body'], $rezultat['status']);
        } catch (\Throwable $e) {
            \Log::error('Greška pri kreiranju prijave: '.$e->getMessage(), [
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json([
                'poruka' => 'Došlo je do greške pri rezervaciji. Pokušajte ponovo.'
            ], 500);
        }
    }

    // Prikaz jedne prijave
    public function show($id)
    {
        $prijava = Prijava::with(['korisnik', 'izlozba'])->find($id);

        if (!$prijava) {
            return response()->json(['poruka' => 'Prijava nije pronađena.'], 404);
        }

        return response()->json($prijava, 200);
    }

    // Ažuriranje prijave
    public function update(Request $request, $id)
    {
        $prijava = Prijava::find($id);
        if (!$prijava) {
            return response()->json(['poruka' => 'Prijava nije pronađena.'], 404);
        }

        $validated = $request->validate([
            'korisnik_id'   => 'sometimes|exists:korisnici,id',
            'izlozba_id'    => 'sometimes|exists:izlozbe,id',
            'datum_prijave' => 'sometimes|date'
        ]);

        $prijava->update($validated);

        return response()->json([
            'poruka'  => 'Prijava ažurirana.',
            'prijava' => $prijava
        ], 200);
    }

    // Brisanje prijave + vraćanje slobodnog mesta
    public function destroy($id)
    {
        // Brisanje sa detalja radi administrator (po zahtevu)
        if (!auth()->check() || auth()->user()->uloga !== 'administrator') {
            return response()->json(['poruka' => 'Nemate dozvolu za brisanje.'], 403);
        }

        $prijava = Prijava::find($id);
        if (!$prijava) {
            return response()->json(['poruka' => 'Prijava nije pronađena.'], 404);
        }

        try {
            $rez = DB::transaction(function () use ($prijava) {
                // Zaključaj izložbu, uvećaj mesta i obriši prijavu
                $izlozba = Izlozba::where('id', $prijava->izlozba_id)
                    ->lockForUpdate()
                    ->first();

                if ($izlozba) {
                    $izlozba->increment('dostupnaMesta');
                    $preostalo = $izlozba->dostupnaMesta; // posle increment-a
                } else {
                    $preostalo = null;
                }

                $prijava->delete();

                return [
                    'status' => 200,
                    'body'   => [
                        'poruka'         => 'Prijava obrisana.',
                        'preostaloMesta' => $preostalo,
                    ],
                ];
            });

            return response()->json($rez['body'], $rez['status']);
        } catch (\Throwable $e) {
            \Log::error('Greška pri brisanju prijave: '.$e->getMessage(), [
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json([
                'poruka' => 'Došlo je do greške pri brisanju. Pokušajte ponovo.'
            ], 500);
        }
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
            'poruka' => "Ažurirano $brojAzuriranih prijava za izložbu sa ID $id.",
        ], 200);
    }
}
