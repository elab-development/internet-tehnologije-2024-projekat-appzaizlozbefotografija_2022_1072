<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class IzlozbeTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('izlozbe')->delete();
        
        \DB::table('izlozbe')->insert(array (
            0 => 
            array (
                'id' => 1,
                'naziv' => 'Malta',
                'opis' => 'Malta viđena okom fotografa je priča o svetlosti i tišini. More, kamen, senke – jednostavni motivi pretvoreni u moćne emocije. Ova izložba je meditacija o vremenu, prostoru i putovanju.',
                'lokacija' => 'Beograd',
                'datum' => '2025-06-21 20:00:00',
                'dostupnaMesta' => 50,
                'created_at' => '2025-05-20 18:51:27',
                'updated_at' => '2025-05-20 18:51:27',
            ),
            1 => 
            array (
                'id' => 2,
                'naziv' => 'Turska',
                'opis' => 'Kroz oko fotografa, \'Turska\' postaje vizuelni dnevnik avanture kroz Istok i Zapad. Svaka slika je stranica priče o zemlji bogate prošlosti i savremenog duha.',
                'lokacija' => 'Beograd',
                'datum' => '2025-07-21 20:00:00',
                'dostupnaMesta' => 50,
                'created_at' => '2025-05-20 18:52:53',
                'updated_at' => '2025-05-20 18:52:53',
            ),
        ));
        
        
    }
}