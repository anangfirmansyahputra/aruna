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
        Schema::table("product_faqs", function (Blueprint $table) {
            $table->dropColumn("question");
            $table->dropColumn("answer");
            $table->string('en_question');
            $table->string('id_question');
            $table->string('en_answer');
            $table->string('id_answer');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table("product_faqs", function (Blueprint $table) {
            $table->dropColumn("en_question");
            $table->dropColumn("id_question");
            $table->dropColumn("en_answer");
            $table->dropColumn("id_answer");
            $table->string('question');
            $table->string('answer');
        });
    }
};
