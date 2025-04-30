<?php

namespace App\Http\Controllers;

use App\Models\Izlozba;
use Illuminate\Http\Request;

class IzlozbaController extends Controller
{
    // Prikaz svih izložbi
    public function index()
    {
        return response()->json(Izlozba::all(), 200);
    }

    // Dodavanje nove izložbe
    public function store(Request $request)
{
    $validatedData = $request->validate([
        'naziv' => 'required|string|max:255',
        'datum' => 'required|date',
        'lokacija' => 'required|string|max:255',
        'opis' => 'nullable|string',
    ]);

    $izlozba = Izlozba::create($validatedData);

    return response()->json($izlozba, 201); // 201 = Created
}


    // Prikaz jedne izložbe
    public function show($id)
{
    $izlozba = Izlozba::find($id);

    if (!$izlozba) {
        return response()->json(['message' => 'Izlozba nije pronađena.'], 404);
    }

    return response()->json($izlozba, 200);
}

    // Ažuriranje izložbe
    public function update(Request $request, $id)
{
    $izlozba = Izlozba::find($id);
    if (!$izlozba) {
        return response()->json(['error' => 'Izložba nije pronađena.'], 404);
    }

    $validatedData = $request->validate([
        'naziv' => 'required|string|max:255',
        'datum' => 'required|date',
        'lokacija' => 'required|string|max:255',
        'opis' => 'nullable|string',
    ]);

    $izlozba->update($validatedData);

    return response()->json($izlozba);
}


    // Brisanje izložbe
    public function destroy($id)
    {
        $izlozba = Izlozba::find($id);
    
        if (!$izlozba) {
            return response()->json(['message' => 'Izložba nije pronađena.'], 404);
        }
    
        $izlozba->delete();
    
        return response()->json(null, 204);
    }
}