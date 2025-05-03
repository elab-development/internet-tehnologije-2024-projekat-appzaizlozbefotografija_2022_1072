<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Korisnik extends Model
{
    use HasFactory;

    protected $table = 'korisnici';

    protected $fillable = [
        'ime',
        'prezime',
        'email',
        'lozinka',
        'uloga',
    ];

    public function prijave()
    {
        return $this->hasMany(Prijava::class, 'korisnik_id');
    }

    

}