<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class ProductRequirement extends Model
{
    protected $fillable = [
        'id_title',
        'en_title',
        'items',
        'product_id'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    protected function createdAt(): Attribute
    {
        return Attribute::get(fn($value) => \Carbon\Carbon::parse($value)->format('d M Y'));
    }
}
