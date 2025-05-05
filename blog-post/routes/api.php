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

// ✅ Admin – izložbe (store, update, destroy)
Route::middleware(['auth:sanctum', 'uloga:administrator'])->group(function () {
    Route::post('/izlozbe', [IzlozbaController::class, 'store']);
    Route::put('/izlozbe/{id}', [IzlozbaController::class, 'update']);
    Route::delete('/izlozbe/{id}', [IzlozbaController::class, 'destroy']);
});

// ✅ Fotograf – dodavanje fotografija
Route::middleware(['auth:sanctum', 'uloga:fotograf'])->post('/fotografije', [FotografijaController::class, 'store']);

// ✅ Admin i fotograf – brisanje fotografija
Route::middleware(['auth:sanctum', 'uloga:administrator,fotograf'])->delete('/fotografije/{id}', [FotografijaController::class, 'destroy']);

// ✅ Posetilac – kreiranje prijave
Route::middleware(['auth:sanctum', 'uloga:posetilac'])->post('/prijave', [PrijavaController::class, 'store']);

// ✅ Admin i posetilac – brisanje prijave
Route::middleware(['auth:sanctum', 'uloga:administrator,posetilac'])->delete('/prijave/{id}', [PrijavaController::class, 'destroy']);

// ✅ Ostale pomoćne rute (bez kontrole po ulozi)
Route::get('/izlozbe/{id}/fotografije', [IzlozbaController::class, 'fotografije']);
Route::get('/korisnici/{id}/izlozbe', [KorisnikController::class, 'izlozbe']);
Route::post('/prijave/{id}/posalji-potvrdu', [PrijavaController::class, 'posaljiPotvrdu']);
Route::put('/izlozbe/{id}/prijave/datum', [PrijavaController::class, 'azurirajDatumeZaIzlozbu']);

// ✅ Test i zaštićena ruta
Route::middleware('auth:sanctum')->get('/zasticeno', function (Request $request) {
    return response()->json(['poruka' => 'Pristup uspešan. Dobrodošao, ' . $request->user()->ime]);
});

Route::get('/test', fn() => response()->json(['radi' => true]));
