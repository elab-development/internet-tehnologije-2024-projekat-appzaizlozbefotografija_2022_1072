<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class PrijaveTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('prijave')->delete();
        
        \DB::table('prijave')->insert(array (
            0 => 
            array (
                'id' => 1,
                'datum_prijave' => '2025-05-22 00:00:00',
                'korisnik_id' => 1,
                'izlozba_id' => 1,
                'qr_kod' => 'a3ba230b-0151-487d-8dd8-e2fae95a95fb',
                'created_at' => '2025-05-22 15:36:30',
                'updated_at' => '2025-05-22 15:36:30',
                'status' => 'na čekanju',
            ),
        ));
        
        
    }
}