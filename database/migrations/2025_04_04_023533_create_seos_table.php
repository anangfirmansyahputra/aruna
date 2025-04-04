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
        Schema::create('seos', function (Blueprint $table) {
            $table->id();
            $table->string('id_title');
            $table->string('en_title');
            $table->text('id_meta_descriptions');
            $table->text('en_meta_descriptions');
            $table->json('id_keywords');
            $table->json('en_keywords');
            $table->enum("type", ["home", "about", "product", "article", "career", "promo", "proposal", "deposito", "contact", "faq"]);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seos');
    }
};
