<?php

namespace App\Http\Controllers;
use Illuminate\Support\Str;
use App\Models\Prijava;
use Illuminate\Http\Request;


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
    $validated = $request->validate([
        'korisnik_id' => 'required|exists:korisnici,id',
        'izlozba_id' => 'required|exists:izlozbe,id',
    ]);

    $validated['datum_prijave'] = now()->toDateString(); // ⬅ automatski datum
    $validated['qr_kod'] = \Illuminate\Support\Str::uuid(); // ⬅ automatski QR kod

    $prijava = Prijava::create($validated);

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
        $prijava = Prijava::find($id);

        if (!$prijava) {
            return response()->json(['message' => 'Prijava nije pronađena.'], 404);
        }

        $prijava->delete();

        return response()->json(null, 204);
    }

    public function posaljiPotvrdu($id)
{
    $prijava = \App\Models\Prijava::find($id);
    if (!$prijava) {
        return response()->json(['error' => 'Prijava nije pronađena.'], 404);
    }

    
    return response()->json(['message' => 'Potvrda o prijavi je uspešno poslata (simulirano).']);
}

public function azurirajDatumeZaIzlozbu(Request $request, $id)
{
    $request->validate([
        'datum_prijave' => 'required|date',
    ]);

    $brojAzuriranih = \App\Models\Prijava::where('izlozba_id', $id)
        ->update(['datum_prijave' => $request->datum_prijave]);

    return response()->json([
        'message' => "Ažurirano $brojAzuriranih prijava za izložbu sa ID $id.",
    ]);
}




}
