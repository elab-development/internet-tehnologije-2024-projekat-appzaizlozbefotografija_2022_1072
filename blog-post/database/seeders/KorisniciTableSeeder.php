<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class KorisniciTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('korisnici')->delete();
        
        \DB::table('korisnici')->insert(array (
            0 => 
            array (
                'id' => 1,
                'ime' => 'Antonela',
                'prezime' => 'Novakovic',
                'email' => 'antonela@gmail.com',
                'lozinka' => '$2y$12$15T7BPMm2DTldlA.EosYSuw/PKgegAfizVZJrvOMLxjI.cshxsYWO',
                'uloga' => 'administrator',
                'created_at' => '2025-05-20 18:44:46',
                'updated_at' => '2025-05-20 18:44:46',
            ),
            1 => 
            array (
                'id' => 2,
                'ime' => 'Marko',
                'prezime' => 'Ristic',
                'email' => 'marko@gmail.com',
                'lozinka' => '$2y$12$vCV2IOUy5dGKfBNznWkCbO.286BkB45PEC/eCB6ckznQCFpQcBcHO',
                'uloga' => 'fotograf',
                'created_at' => '2025-05-20 18:56:22',
                'updated_at' => '2025-05-20 18:56:22',
            ),
            2 => 
            array (
                'id' => 3,
                'ime' => 'Ksenija',
                'prezime' => 'Kostic',
                'email' => 'ksenija@gmail.com',
                'lozinka' => '$2y$12$qXEkgaejTZEKWNuPDsNpTeucxMU8U0PH.Ec5rXhn8Mw5leybLHHZW',
                'uloga' => 'posetilac',
                'created_at' => '2025-05-21 11:27:35',
                'updated_at' => '2025-05-21 11:27:35',
            ),
        ));
        
        
    }
}