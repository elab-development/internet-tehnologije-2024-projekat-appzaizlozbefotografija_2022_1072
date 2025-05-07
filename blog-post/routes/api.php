<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IzlozbaController;
use App\Http\Controllers\KorisnikController;
use App\Http\Controllers\PrijavaController;
use App\Http\Controllers\FotografijaController;
use App\Http\Controllers\AutentifikacijaKontroler;
use Illuminate\Http\Request;

// ✅ Autentifikacija
Route::post('/registracija', [AutentifikacijaKontroler::class, 'registracija']);
Route::post('/prijava', [AutentifikacijaKontroler::class, 'prijava']);
Route::middleware('auth:sanctum')->post('/odjava', [AutentifikacijaKontroler::class, 'odjava']);

// ✅ Javne rute
Route::get('/izlozbe', [IzlozbaController::class, 'index']);
Route::get('/izlozbe/{id}', [IzlozbaController::class, 'show']);

Route::get('/fotografije', [FotografijaController::class, 'index']);
Route::get('/fotografije/{id}', [FotografijaController::class, 'show']);

Route::get('/prijave', [PrijavaController::class, 'index']);
Route::get('/prijave/{id}', [PrijavaController::class, 'show']);

// ✅ Zaštićene rute – pristup po ulozi se proverava u kontroleru
Route::middleware('auth:sanctum')->group(function () {
    // Admin – upravljanje izložbama
    Route::post('/izlozbe', [IzlozbaController::class, 'store']);
    Route::put('/izlozbe/{id}', [IzlozbaController::class, 'update']);
    Route::delete('/izlozbe/{id}', [IzlozbaController::class, 'destroy']);

    // Fotograf – dodavanje fotografija
    Route::post('/fotografije', [FotografijaController::class, 'store']);

    // Admin i fotograf – brisanje fotografija
    Route::delete('/fotografije/{id}', [FotografijaController::class, 'destroy']);

    // Posetilac – kreiranje prijave
    Route::post('/prijave', [PrijavaController::class, 'store']);

    // Admin i posetilac – brisanje prijave
    Route::delete('/prijave/{id}', [PrijavaController::class, 'destroy']);

    // Test ruta za proveru autentifikacije
    Route::get('/zasticeno', function (Request $request) {
        return response()->json([
            'poruka' => 'Pristup uspešan. Dobrodošao, ' . $request->user()->name
        ]);
    });
});

// ✅ Ostale pomoćne rute (javno dostupne)
Route::get('/izlozbe/{id}/fotografije', [IzlozbaController::class, 'fotografije']);
Route::get('/korisnici/{id}/izlozbe', [KorisnikController::class, 'izlozbe']);
Route::post('/prijave/{id}/posalji-potvrdu', [PrijavaController::class, 'posaljiPotvrdu']);
Route::put('/izlozbe/{id}/prijave/datum', [PrijavaController::class, 'azurirajDatumeZaIzlozbu']);

// ✅ Test ruta
Route::get('/test', fn() => response()->json(['radi' => true]));

Route::post('/zaboravljena-lozinka', [AutentifikacijaKontroler::class, 'resetujLozinku']);
