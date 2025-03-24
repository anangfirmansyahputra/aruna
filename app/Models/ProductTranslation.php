<?php

namespace App\Models;

use App\Enums\LanguageCode;
use Illuminate\Database\Eloquent\Model;

class ProductTranslation extends Model
{
    protected $fillable = [
        'name',
        "product_id",
        "language_code",
        'collateral_name',
        'slug',
        'keywords',
        'meta_descriptions',
        'content',
        "heading_one",
        "heading_two"
    ];

    protected $casts = [
        "language_code" => LanguageCode::class,
        'keywords' => 'array',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
