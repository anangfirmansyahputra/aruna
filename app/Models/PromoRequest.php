<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class PromoRequest extends Model
{
    protected $fillable = [
        "name",
        "promo_id",
        "no_hp",
        "email",
        "address"
    ];

    public function promo()
    {
        return $this->belongsTo(Promo::class);
    }

    public function createdAt(): Attribute
    {
        return Attribute::get(fn($value) => \Carbon\Carbon::parse($value)->format('d M Y'));
    }
}