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
        Schema::create('company_values', function (Blueprint $table) {
            $table->id();
            $table->string("icon");
            $table->string("en_title");
            $table->string("id_title");
            $table->string("en_description");
            $table->string("id_description");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_values');
    }
};
