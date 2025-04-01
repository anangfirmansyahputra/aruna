<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class TeamProfile extends Model
{
    protected $fillable = [
        'name',
        'en_title',
        'id_title',
        'en_description',
        'id_description',
        'image_url'
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

        static::deleting(function (TeamProfile $teamProfile) {
            if ($teamProfile->image_url) {
                Storage::disk('public')->delete(str_replace(env('APP_URL') . '/storage/', '', $teamProfile->image_url));
            }
        });

        static::updating(function ($teamProfile) {
            if ($teamProfile->isDirty('image_url')) {
                $oldImage = $teamProfile->getOriginal('image_url');

                if ($oldImage) {
                    Storage::disk('public')->delete(str_replace(env('APP_URL') . '/storage/', '', $oldImage));
                }
            }
        });
    }
}
