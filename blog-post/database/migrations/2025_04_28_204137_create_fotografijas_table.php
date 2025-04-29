<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFotografijasTable extends Migration
{
    public function up()
    {
        Schema::create('fotografije', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('izlozba_id');
            $table->string('url');
            $table->string('naziv');
            $table->text('opis')->nullable();
            $table->timestamps();

            // Spoljni ključ
            $table->foreign('izlozba_id')->references('id')->on('izlozbe')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('fotografije');
    }
}