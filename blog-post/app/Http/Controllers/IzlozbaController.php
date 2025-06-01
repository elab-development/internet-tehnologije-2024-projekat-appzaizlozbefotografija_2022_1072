<?php

namespace App\Http\Controllers;

use App\Models\Izlozba;
use Illuminate\Http\Request;

class IzlozbaController extends Controller
{
    public function index(Request $request)
    {
        $query = Izlozba::query();

        if ($request->has('naziv')) {
            $query->where('naziv', 'like', '%' . $request->naziv . '%');
        }

        if ($request->has('datum')) {
            $query->whereDate('datum', $request->datum);
        }

        if ($request->has('lokacija')) {
            $query->where('lokacija', 'like', '%' . $request->lokacija . '%');
        }

        $izlozbe = $query->paginate(10);
        return response()->json($izlozbe);
    }

    public function store(Request $request)
    {
        if (auth()->user()->uloga !== 'administrator') {
            return response()->json(['poruka' => 'Nemate dozvolu za ovu akciju.'], 403);
        }

        $validated = $request->validate([
            'naziv' => 'required|string|max:255',
            'datum' => 'required|date',
            'lokacija' => 'required|string|max:255',
            'opis' => 'nullable|string',
            'dostupnaMesta' => 'nullable|integer|min:0'
        ]);

        $izlozba = Izlozba::create($validated);

        return response()->json($izlozba->fresh(), 201);
    }

    public function show($id)
    {
        $izlozba = Izlozba::find($id);

        if (!$izlozba) {
            return response()->json(['message' => 'Izložba nije pronađena.'], 404);
        }

        return response()->json($izlozba);
    }

    public function update(Request $request, $id)
    {
        if (auth()->user()->uloga !== 'administrator') {
            return response()->json(['poruka' => 'Nemate dozvolu za ovu akciju.'], 403);
        }

        $izlozba = Izlozba::find($id);
        if (!$izlozba) {
            return response()->json(['error' => 'Izložba nije pronađena.'], 404);
        }

        $validated = $request->validate([
            'naziv' => 'required|string|max:255',
            'datum' => 'required|date',
            'lokacija' => 'required|string|max:255',
            'opis' => 'nullable|string',
            'dostupnaMesta' => 'nullable|integer|min:0'
        ]);

        $izlozba->update($validated);

        return response()->json($izlozba->fresh());
    }

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

        return response()->json(['message' => 'Izložba je uspešno obrisana.'], 200);
    }

    public function fotografije($id)
    {
        $izlozba = Izlozba::find($id);
        if (!$izlozba) {
            return response()->json(['error' => 'Izložba nije pronađena.'], 404);
        }

        return response()->json($izlozba->fotografije);
    }

    public function prijave($id)
{
    $izlozba = Izlozba::find($id);
    if (!$izlozba) {
        return response()->json(['error' => 'Izložba nije pronađena.'], 404);
    }

    return response()->json(
        $izlozba->prijave()->with('korisnik')->get()
    );
}

}
