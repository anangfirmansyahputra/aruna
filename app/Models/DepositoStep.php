<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class DepositoStep extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_title',
        'en_title',
        'id_description',
        'en_description',
        'image_url',
        'position',
        'is_highlighted',
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

        static::deleting(function (DepositoStep $depositoStep) {
            if ($depositoStep->image_url) {
                Storage::disk('public')->delete(str_replace(env('APP_URL') . '/storage/', '', $depositoStep->image_url));
            }
        });

        static::updating(function ($depositoStep) {
            if ($depositoStep->isDirty('image_url')) {
                $oldImage = $depositoStep->getOriginal('image_url');

                if ($oldImage) {
                    Storage::disk('public')->delete(str_replace(env('APP_URL') . '/storage/', '', $oldImage));
                }
            }
        });
    }
}
