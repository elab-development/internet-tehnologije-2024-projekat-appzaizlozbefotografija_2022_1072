<?php

namespace App\Http\Controllers;

use App\Models\Korisnik;
use Illuminate\Http\Request;

class KorisnikController extends Controller
{
    // Prikaz svih korisnika
    public function index()
    {
        return response()->json(Korisnik::all(), 200);
    }

    // Dodavanje novog korisnika
    public function store(Request $request)
{
    $validated = $request->validate([
        'ime' => 'required|string|max:50',
        'prezime' => 'required|string|max:50',
        'email' => 'required|email|unique:korisnici,email',
        'lozinka' => 'required|string|min:6',
        'uloga' => 'required|in:admin,fotograf,posetilac',
    ]);

    $validated['lozinka'] = bcrypt($validated['lozinka']); // heširanje lozinke

    $korisnik = Korisnik::create($validated);

    return response()->json($korisnik, 201);
}

    // Prikaz jednog korisnika
    public function show($id)
    {
        $korisnik = Korisnik::find($id);

        if (!$korisnik) {
            return response()->json(['message' => 'Korisnik nije pronađen.'], 404);
        }

        return response()->json($korisnik, 200);
    }

    // Ažuriranje korisnika
    public function update(Request $request, $id)
    {
        $korisnik = Korisnik::find($id);

        if (!$korisnik) {
            return response()->json(['message' => 'Korisnik nije pronađen.'], 404);
        }

        $korisnik->update($request->all());

        return response()->json($korisnik, 200);
    }

    // Brisanje korisnika
    public function destroy($id)
    {
        $korisnik = Korisnik::find($id);

        if (!$korisnik) {
            return response()->json(['message' => 'Korisnik nije pronađen.'], 404);
        }

        $korisnik->delete();

        return response()->json(null, 204);
    }

    public function izlozbe($id)
{
    $korisnik = \App\Models\Korisnik::with('prijave.izlozba')->find($id);

    if (!$korisnik) {
        return response()->json(['error' => 'Korisnik nije pronađen.'], 404);
    }

    $izlozbe = $korisnik->prijave->map(function ($prijava) {
        return $prijava->izlozba;
    });

    return response()->json($izlozbe);
}


}
