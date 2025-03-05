<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class News extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'keywords',
        'tags',
        'meta_description',
        'content',
        'image_url',
    ];

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

        static::deleting(function (News $news) {
            if ($news->image_url) {
                Storage::disk('public')->delete(str_replace(env('APP_URL') . '/storage/', '', $news->image_url));
            }
        });

        static::updating(function ($news) {
            if ($news->isDirty('image_url')) {
                $oldImage = $news->getOriginal('image_url');

                if ($oldImage) {
                    Storage::disk('public')->delete(str_replace(env('APP_URL') . '/storage/', '', $oldImage));
                }
            }
        });
    }
}
