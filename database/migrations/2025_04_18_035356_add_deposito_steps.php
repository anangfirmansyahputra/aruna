<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('deposito_steps', function (Blueprint $table) {
            $table->id();
            $table->string('id_title');
            $table->string('en_title');
            $table->text('id_description');
            $table->text('en_description');
            $table->integer('position');
            $table->boolean('is_highlighted');
            $table->string('image_url')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deposito_steps');
    }
};

