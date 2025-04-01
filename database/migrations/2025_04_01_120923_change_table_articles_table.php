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
        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn('title');
            $table->dropColumn('category');
            $table->dropColumn('detail_information');
            $table->dropColumn('slug');
            $table->dropColumn('keywords');
            $table->dropColumn('tags');
            $table->dropColumn('meta_description');
            $table->dropColumn('content');

            $table->string("id_title");
            $table->string("en_title");
            $table->string("id_category");
            $table->string("en_category");
            $table->string("id_detail_information");
            $table->string("en_detail_information");
            $table->string("id_slug");
            $table->string("en_slug");
            $table->string("id_keywords");
            $table->string("en_keywords");
            $table->string("id_tags");
            $table->string("en_tags");
            $table->string("id_meta_description");
            $table->string("en_meta_description");
            $table->string("id_content");
            $table->string("en_content");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn("id_title");
            $table->dropColumn("en_title");
            $table->dropColumn("id_category");
            $table->dropColumn("en_category");
            $table->dropColumn("id_detail_information");
            $table->dropColumn("en_detail_information");
            $table->dropColumn("id_slug");
            $table->dropColumn("en_slug");
            $table->dropColumn("id_keywords");
            $table->dropColumn("en_keywords");
            $table->dropColumn("id_tags");
            $table->dropColumn("en_tags");
            $table->dropColumn("id_meta_description");
            $table->dropColumn("en_meta_description");
            $table->dropColumn("id_content");
            $table->dropColumn("en_content");

            $table->string('title')->unique();
            $table->string('category');
            $table->longText('detail_information')->nullable();
            $table->string('slug')->unique();
            $table->string('keywords');
            $table->string('tags');
            $table->text('meta_description');
            $table->longText('content');
        });
    }
};
