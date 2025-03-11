<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class ProductFAQ extends Model
{
    protected $table = "product_faqs";

    protected $fillable = [
        'product_id',
        'question',
        'answer'
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
