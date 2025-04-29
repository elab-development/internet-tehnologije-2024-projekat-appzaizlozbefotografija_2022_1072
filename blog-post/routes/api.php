<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IzlozbaController;
use App\Http\Controllers\KorisnikController;
use App\Http\Controllers\PrijavaController;
use App\Http\Controllers\FotografijaController;

Route::apiResource('prijave', PrijavaController::class);
Route::apiResource('izlozbe', IzlozbaController::class);
Route::apiResource('korisnici', KorisnikController::class);
Route::apiResource('fotografije', FotografijaController::class);