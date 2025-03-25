<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class ProductFeature extends Model
{
    protected $fillable = [
        'icon',
        'en_title',
        'id_title',
        'en_description',
        'id_description',
        'product_id',
    ];

    protected function createdAt(): Attribute
    {
        return Attribute::get(fn($value) => \Carbon\Carbon::parse($value)->format('d M Y'));
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
