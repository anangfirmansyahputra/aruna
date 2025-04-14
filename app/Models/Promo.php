<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Promo extends Model
{
    protected $fillable = [
        "product_id",
        'image_url',
        'start_date',
        'end_date',
        'coupon',
        'id_content',
        'en_content',
        'id_description',
        'en_description',
        "id_title",
        "en_title",
        'id_slug',
        'en_slug'
    ];

    protected function createdAt(): Attribute
    {
        return Attribute::get(fn($value) => \Carbon\Carbon::parse($value)->format('d M Y'));
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($promo) {
            if ($promo->image_url) {
                Storage::disk('public')->delete($promo->image_url);
            }
        });

        static::updating(function ($promo) {
            if ($promo->isDirty('image_url')) {
                $oldImage = $promo->getOriginal('image_url');

                if ($oldImage) {
                    Storage::disk('public')->delete($oldImage);
                }
            }
        });
    }
}
