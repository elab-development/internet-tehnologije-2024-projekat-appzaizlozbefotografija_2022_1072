<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePrijavasTable extends Migration
{
    public function up()
    {
        Schema::create('prijave', function (Blueprint $table) {
            $table->id();
            $table->dateTime('datum_prijave'); 
            $table->unsignedBigInteger('korisnik_id');
            $table->unsignedBigInteger('izlozba_id');
            $table->string('qr_kod')->nullable();
            $table->timestamps();

            // Definisanje spoljnih ključeva
            $table->foreign('korisnik_id')->references('id')->on('korisnici')->onDelete('cascade');
            $table->foreign('izlozba_id')->references('id')->on('izlozbe')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('prijave');
    }
}