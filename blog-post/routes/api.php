<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IzlozbaController;

Route::get('/pozdrav', function () {
    return response()->json([
        'poruka' => 'Zdravo iz mog prvog API-ja u Laravelu!'
    ]);
});

Route::apiResource('izlozbe', IzlozbaController::class);