<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Izlozba extends Model
{
    use HasFactory;

    protected $table = 'izlozbas';

    protected $fillable = [
        'naziv',
        'opis',
        'lokacija',
        'datum',
        'dostupnaMesta'
    ];
}