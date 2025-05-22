<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class FotografijeTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('fotografije')->delete();
        
        \DB::table('fotografije')->insert(array (
            0 => 
            array (
                'id' => 1,
                'izlozba_id' => 1,
                'naziv' => 'Plavetnilo Malte',
                'opis' => 'Pogled na plavo more Malte — spoj prirodne čistoće i mediteranskog šarma.',
                'created_at' => '2025-05-20 19:04:38',
                'updated_at' => '2025-05-20 19:04:38',
                'putanja_slike' => 'fotografije/2zTNQQtIykJag0ggmFNqGNigftUG5s1eJB0J5CIE.jpg',
            ),
            1 => 
            array (
                'id' => 2,
                'izlozba_id' => 2,
                'naziv' => 'Kapadokijska stena',
                'opis' => 'Jedinstvena kamena formacija u Kapadokiji – svedok vremena isklesan vetrom i kišom.',
                'created_at' => '2025-05-20 19:06:52',
                'updated_at' => '2025-05-20 19:06:52',
                'putanja_slike' => 'fotografije/687p1INCF8qBKo8EOHuwLBclc0Dz0SqRfTaEzeam.jpg',
            ),
            2 => 
            array (
                'id' => 3,
                'izlozba_id' => 1,
                'naziv' => 'Lampioni iznad Valete',
                'opis' => 'Fotografija osvetljene ulice u srcu Malte prikazuje spoj tradicije i svetla – mesto gde se istorija i umetnost susreću pod sjajem sijalica.',
                'created_at' => '2025-05-21 11:19:35',
                'updated_at' => '2025-05-21 11:19:35',
                'putanja_slike' => 'fotografije/fvOG9BkXaHGjCGLNDW9vIexKfAdPdvl3nW8A5Etr.jpg',
            ),
            3 => 
            array (
                'id' => 4,
                'izlozba_id' => 1,
                'naziv' => 'Kameni ritam demokratije',
                'opis' => 'Moderna arhitektura Parlamenta Malte, sa svojom karakterističnom kamenom fasadom, stoji u kontrastu sa istorijskom jezgrom Valete, spajajući tradiciju i budućnost.',
                'created_at' => '2025-05-21 11:21:22',
                'updated_at' => '2025-05-21 11:21:22',
                'putanja_slike' => 'fotografije/XpcTj7O50PPifp7t4fB6pnn4fa3l708jIzBW8JGa.jpg',
            ),
            4 => 
            array (
                'id' => 5,
                'izlozba_id' => 2,
                'naziv' => 'Tišina kamena',
                'opis' => 'U središtu pustoši Kapadokije uzdiže se kamena kula prirode, okružena prašinom, tišinom i večnim nebom Anadolije.',
                'created_at' => '2025-05-21 11:23:46',
                'updated_at' => '2025-05-21 11:23:46',
                'putanja_slike' => 'fotografije/pPVq0gQfptB2mB6tuBxgJ2wH68ajJ6zlM4Vqpk2N.jpg',
            ),
            5 => 
            array (
                'id' => 6,
                'izlozba_id' => 2,
                'naziv' => 'Stari duh prestonice',
                'opis' => 'Ankara se u ovoj fotografiji ogleda kroz mirnu, autentičnu uličicu – spoj istorije i svakodnevice, gde vreme prolazi sporije.',
                'created_at' => '2025-05-21 11:25:21',
                'updated_at' => '2025-05-21 11:25:21',
                'putanja_slike' => 'fotografije/gDestVRUn9vVYX9bPgrMjRUHflLwB52JR0hl86TB.jpg',
            ),
        ));
        
        
    }
}