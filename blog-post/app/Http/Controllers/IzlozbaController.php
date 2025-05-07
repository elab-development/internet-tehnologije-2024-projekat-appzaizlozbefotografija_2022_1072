<?php

namespace App\Http\Controllers;

use App\Models\Izlozba;
use Illuminate\Http\Request;

class IzlozbaController extends Controller
{
    public function index(Request $request)
{
    $query = Izlozba::query();

    // Filtriranje po nazivu
    if ($request->has('naziv')) {
        $query->where('naziv', 'like', '%' . $request->naziv . '%');
    }

    // Filtriranje po datumu
    if ($request->has('datum')) {
        $query->whereDate('datum', $request->datum);
    }

    // Filtriranje po lokaciji
    if ($request->has('lokacija')) {
    $query->where('lokacija', 'like', '%' . $request->lokacija . '%');
    }


    // Paginacija (10 po strani)
    $izlozbe = $query->paginate(10);

    return response()->json($izlozbe);
}

    // Dodavanje nove izložbe
    public function store(Request $request)
{
    if (auth()->user()->uloga !== 'administrator') {
        return response()->json(['poruka' => 'Nemate dozvolu za ovu akciju.'], 403);
    }
    
    $validatedData = $request->validate([
        'naziv' => 'required|string|max:255',
        'datum' => 'required|date',
        'lokacija' => 'required|string|max:255',
        'opis' => 'nullable|string',
        'dostupnaMesta' => 'nullable|integer|min:0'
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
    if (auth()->user()->uloga !== 'administrator') {
        return response()->json(['poruka' => 'Nemate dozvolu za ovu akciju.'], 403);
    }
    
    $izlozba = Izlozba::find($id);
    if (!$izlozba) {
        return response()->json(['error' => 'Izložba nije pronađena.'], 404);
    }

    $validatedData = $request->validate([
        'naziv' => 'required|string|max:255',
        'datum' => 'required|date',
        'lokacija' => 'required|string|max:255',
        'opis' => 'nullable|string',
        'dostupnaMesta' => 'nullable|integer|min:0'
    ]);

    $izlozba->update($validatedData);

    return response()->json($izlozba);
}


    // Brisanje izložbe
    public function destroy($id)
    {
        if (auth()->user()->uloga !== 'administrator') {
            return response()->json(['poruka' => 'Nemate dozvolu za ovu akciju.'], 403);
        }
        
        $izlozba = Izlozba::find($id);
    
        if (!$izlozba) {
            return response()->json(['message' => 'Izložba nije pronađena.'], 404);
        }
    
        $izlozba->delete();
    
        return response()->json(null, 204);
    }

    public function fotografije($id)
{
    $izlozba = \App\Models\Izlozba::find($id);
    if (!$izlozba) {
        return response()->json(['error' => 'Izložba nije pronađena.'], 404);
    }

    return response()->json($izlozba->fotografije);
}

}