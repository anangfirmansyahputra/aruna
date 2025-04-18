<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class DepositoCarousel extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_title',
        'en_title',
        'id_description',
        'en_description',
        'image_url',
    ];

    protected function createdAt(): Attribute
    {
        return Attribute::get(fn($value) => \Carbon\Carbon::parse($value)->format('d M Y'));
    }

    protected function imageUrl(): Attribute
    {
        return Attribute::get(fn($value) => env('APP_URL') . '/storage/' . $value);
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function (DepositoCarousel $depositoCarousel) {
            if ($depositoCarousel->image_url) {
                Storage::disk('public')->delete(str_replace(env('APP_URL') . '/storage/', '', $depositoCarousel->image_url));
            }
        });

        static::updating(function ($depositoCarousel) {
            if ($depositoCarousel->isDirty('image_url')) {
                $oldImage = $depositoCarousel->getOriginal('image_url');

                if ($oldImage) {
                    Storage::disk('public')->delete(str_replace(env('APP_URL') . '/storage/', '', $oldImage));
                }
            }
        });
    }
}

