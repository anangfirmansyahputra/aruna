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
        Schema::create('promo_requests', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->foreignId("promo_id")->constrained()->cascadeOnDelete();
            $table->string("no_hp");
            $table->string("email");
            $table->text("address");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promo_requests');
    }
};
