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
        Schema::create('promos', function (Blueprint $table) {
            $table->id();
            $table->foreignId("product_id")->constrained()->cascadeOnDelete();
            $table->string('image_url');
            $table->date('start_date');
            $table->date('end_date');
            $table->string('coupon')->unique();
            $table->longText('id_content');
            $table->longText('en_content');
            $table->text('id_description');
            $table->text('en_description');
            $table->text("id_title");
            $table->text("en_title");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promos');
    }
};
