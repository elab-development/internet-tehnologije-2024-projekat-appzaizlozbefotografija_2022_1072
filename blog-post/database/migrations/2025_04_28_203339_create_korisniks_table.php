<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKorisniksTable extends Migration
{
    public function up()
    {
        Schema::create('korisnici', function (Blueprint $table) {
            $table->id();
            $table->string('ime');
            $table->string('prezime');
            $table->string('email')->unique();
            $table->string('lozinka');
            $table->enum('uloga', ['administrator', 'fotograf', 'posetilac']);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('korisnici');
    }
}