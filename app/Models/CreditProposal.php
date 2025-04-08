<?php

namespace App\Models;

use App\Enums\CollateralType;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class CreditProposal extends Model
{
    protected $table = "credit_proposals";

    protected $fillable = [
        "product_id",
        "plafond_amount",
        "usage_purpose",
        "debtor_name",
        "debtor_date_birth",
        "debtor_no_ktp",
        "debtor_npwp",
        "debtor_no_hp",
        "debtor_email",
        "collateral_address",
        "collateral_name_reference",
        "collateral_type",
        "collateral_photo_ktp",
    ];

    protected $casts = [
        "collateral_type" => CollateralType::class
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    protected function createdAt(): Attribute
    {
        return Attribute::get(fn($value) => \Carbon\Carbon::parse($value)->format('d M Y'));
    }

    protected function collateralPhotoKtp(): Attribute
    {
        return Attribute::get(fn($value) => env('APP_URL') . '/storage/' . $value);
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function (CreditProposal $creditProposal) {
            if ($creditProposal->collateral_photo_ktp) {
                Storage::disk('public')->delete(str_replace(env('APP_URL') . '/storage/', '', $creditProposal->collateral_photo_ktp));
            }
        });

        static::updating(function ($creditProposal) {
            if ($creditProposal->isDirty('collateral_photo_ktp')) {
                $oldImage = $creditProposal->getOriginal('collateral_photo_ktp');

                if ($oldImage) {
                    Storage::disk('public')->delete(str_replace(env('APP_URL') . '/storage/', '', $oldImage));
                }
            }
        });
    }
}
