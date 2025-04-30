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
        'korisnik_id' => 'required|exists:korisniks,id',
        'izlozba_id' => 'required|exists:izlozbas,id',
        'napomena' => 'nullable|string|max:500',
    ]);

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
        'korisnik_id' => 'sometimes|exists:korisniks,id',
        'izlozba_id' => 'sometimes|exists:izlozbas,id',
        'napomena' => 'nullable|string|max:500',
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
}
