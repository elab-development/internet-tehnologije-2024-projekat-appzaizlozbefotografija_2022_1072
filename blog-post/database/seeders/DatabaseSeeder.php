<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Učitaj seedere generisane sa iseed komandama
        $this->call([
            KorisniciTableSeeder::class,
            IzlozbeTableSeeder::class,
            FotografijeTableSeeder::class,
            PrijaveTableSeeder::class,
        ]);
    }
}
