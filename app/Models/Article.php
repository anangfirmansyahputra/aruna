<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Article extends Model
{
    protected $fillable = [
        'id_title',
        'en_title',
        'id_slug',
        'en_slug',
        'id_keywords',
        'en_keywords',
        'id_tags',
        'en_tags',
        'id_meta_description',
        'en_meta_description',
        'id_content',
        'en_content',
        'image_url',
        'id_category',
        'en_category',
        'id_detail_information',
        'en_detail_information'
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

        static::deleting(function (Article $article) {
            if ($article->image_url) {
                Storage::disk('public')->delete(str_replace(env('APP_URL') . '/storage/', '', $article->image_url));
            }
        });

        static::updating(function ($article) {
            if ($article->isDirty('image_url')) {
                $oldImage = $article->getOriginal('image_url');

                if ($oldImage) {
                    Storage::disk('public')->delete(str_replace(env('APP_URL') . '/storage/', '', $oldImage));
                }
            }
        });
    }
}
