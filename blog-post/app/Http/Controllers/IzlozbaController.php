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
        $izlozba = Izlozba::create($request->all());
        return response()->json($izlozba, 201);
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
        return response()->json(['message' => 'Izložba nije pronađena.'], 404);
    }

    $izlozba->update($request->all());

    return response()->json($izlozba, 200);
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