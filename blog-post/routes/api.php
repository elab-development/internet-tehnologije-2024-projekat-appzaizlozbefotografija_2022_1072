<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IzlozbaController;
use App\Http\Controllers\KorisnikController;
use App\Http\Controllers\PrijavaController;
use App\Http\Controllers\FotografijaController;
use App\Http\Controllers\AutentifikacijaKontroler;
use Illuminate\Http\Request;

Route::apiResource('prijave', PrijavaController::class);
Route::apiResource('izlozbe', IzlozbaController::class);
Route::apiResource('korisnici', KorisnikController::class);
Route::apiResource('fotografije', FotografijaController::class);

Route::get('/izlozbe/{id}/fotografije', [\App\Http\Controllers\IzlozbaController::class, 'fotografije']);
Route::get('/korisnici/{id}/izlozbe', [\App\Http\Controllers\KorisnikController::class, 'izlozbe']);
Route::post('/prijave/{id}/posalji-potvrdu', [\App\Http\Controllers\PrijavaController::class, 'posaljiPotvrdu']);
Route::put('/izlozbe/{id}/prijave/datum', [\App\Http\Controllers\PrijavaController::class, 'azurirajDatumeZaIzlozbu']);

Route::post('/registracija', [AutentifikacijaKontroler::class, 'registracija']);
Route::post('/prijava', [AutentifikacijaKontroler::class, 'prijava']);
Route::middleware('auth:sanctum')->post('/odjava', [AutentifikacijaKontroler::class, 'odjava']);

Route::middleware('auth:sanctum')->get('/zasticeno', function (Request $request) {
    return response()->json([
        'poruka' => 'Pristup uspešan. Dobrodošao, ' . $request->user()->ime
    ]);
});

Route::get('/test', function () {
    return response()->json(['radi' => true]);
});
