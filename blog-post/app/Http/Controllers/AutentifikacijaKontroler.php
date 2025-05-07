<?php

namespace App\Http\Controllers;

use App\Models\Korisnik;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AutentifikacijaKontroler extends Controller
{
    // Registracija korisnika
    public function registracija(Request $request)
    {
        $podaci = $request->validate([
            'ime' => 'required|string|max:255',
            'prezime' => 'required|string|max:255',
            'email' => 'required|email|unique:korisnici,email',
            'lozinka' => 'required|string|min:6|confirmed',
            'uloga' => 'required|string|in:administrator,fotograf,posetilac'
        ]);

        $korisnik = Korisnik::create([
            'ime' => $podaci['ime'],
            'prezime' => $podaci['prezime'],
            'email' => $podaci['email'],
            'lozinka' => Hash::make($podaci['lozinka']),
            'uloga' => $podaci['uloga']
        ]);

        $token = $korisnik->createToken('pristup_token')->plainTextToken;

        return response()->json([
            'korisnik' => $korisnik,
            'token' => $token
        ], 201);
    }

    // Prijava korisnika
    public function prijava(Request $request)
    {
        $podaci = $request->validate([
            'email' => 'required|email',
            'lozinka' => 'required|string'
        ]);

        $korisnik = Korisnik::where('email', $podaci['email'])->first();

        if (!$korisnik || !Hash::check($podaci['lozinka'], $korisnik->lozinka)) {
            return response()->json(['poruka' => 'Pogrešan email ili lozinka.'], 401);
        }

        $token = $korisnik->createToken('pristup_token')->plainTextToken;

        return response()->json([
            'korisnik' => $korisnik,
            'token' => $token
        ]);
    }

    // Odjava korisnika
    public function odjava(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['poruka' => 'Uspešno ste se odjavili.']);
    }
}
