<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    protected $fillable = [
        'name',
        'category_id',
        'collateral_name',
        'is_credit',
        'image_url',
        'slug',
        'keywords',
        'meta_descriptions',
        'content'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    protected function createdAt(): Attribute
    {
        return Attribute::get(fn($value) => \Carbon\Carbon::parse($value)->format('d M Y H:i'));
    }

    protected function imageUrl(): Attribute
    {
        return Attribute::get(fn($value) => env('APP_URL') . '/storage/' . $value);
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function (Product $product) {
            if ($product->image_url) {
                Storage::disk('public')->delete(str_replace(env('APP_URL') . '/storage/', '', $product->image_url));
            }
        });

        static::updating(function ($product) {
            if ($product->isDirty('image_url')) {
                $oldImage = $product->getOriginal('image_url');

                if ($oldImage) {
                    Storage::disk('public')->delete(str_replace(env('APP_URL') . '/storage/', '', $oldImage));
                }
            }
        });
    }
}
