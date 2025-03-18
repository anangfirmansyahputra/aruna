<?php

use App\Enums\CollateralType;
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
        Schema::create('credit_proposals', function (Blueprint $table) {
            $table->id();
            $table->foreignId("product_id")->nullable()->constrained()->nullOnDelete();
            $table->float("plafond_amount");
            $table->string("usage_purpose");
            $table->string("debtor_name");
            $table->date("debtor_date_birth");
            $table->string("debtor_no_ktp");
            $table->string("debtor_npwp");
            $table->string("debtor_no_hp");
            $table->string("debtor_email");
            $table->string("collateral_name_reference");
            $table->text("collateral_address");
            $table->enum("collateral_type", array_column(CollateralType::cases(), "value"));
            $table->string("collateral_photo_ktp");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('credit_proposals');
    }
};
