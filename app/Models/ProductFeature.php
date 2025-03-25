<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductFeature extends Model
{
    protected $fillable = [
        'icon',
        'en_title',
        'id_title',
        'en_description',
        'id_description',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
