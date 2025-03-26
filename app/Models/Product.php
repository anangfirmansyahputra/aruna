<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'is_credit',
        'image_url',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    protected function createdAt(): Attribute
    {
        return Attribute::get(fn($value) => \Carbon\Carbon::parse($value)->format('d M Y'));
    }

    protected function imageUrl(): Attribute
    {
        return Attribute::get(fn($value) => env('APP_URL') . '/storage/' . $value);
    }

    public function translations(): HasMany
    {
        return $this->hasMany(ProductTranslation::class);
    }

    public function faqs()
    {
        return $this->hasMany(ProductFAQ::class);
    }

    public function scopeTranslation(Builder $query, string $languageCode)
    {
        return $query->with(["translations" => function ($query) use ($languageCode) {
            $query->where("language_code", $languageCode);
        }]);
    }

    public function features()
    {
        return $this->hasMany(ProductFeature::class);
    }

    public function interestRates()
    {
        return $this->hasMany(InterestRate::class);
    }

    public function requirements()
    {
        return $this->hasMany(ProductRequirement::class);
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
