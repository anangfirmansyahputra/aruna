<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Testimonial extends Model
{
    protected $fillable = [
        "name",
        "job",
        "text",
        "image_url"
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

        static::deleting(function (Testimonial $testimonial) {
            if ($testimonial->image_url) {
                Storage::disk('public')->delete(str_replace(env('APP_URL') . '/storage/', '', $testimonial->image_url));
            }
        });

        static::updating(function ($testimonial) {
            if ($testimonial->isDirty('image_url')) {
                $oldImage = $testimonial->getOriginal('image_url');

                if ($oldImage) {
                    Storage::disk('public')->delete(str_replace(env('APP_URL') . '/storage/', '', $oldImage));
                }
            }
        });
    }
}
