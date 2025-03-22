<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected function createdAt(): Attribute
    {
        return Attribute::get(fn($value) => \Carbon\Carbon::parse($value)->format('d M Y'));
    }

    public function translations()
    {
        return $this->hasMany(CategoryTranslation::class);
    }

    public function scopeTranslation(Builder $query, string $languageCode)
    {
        return $query->with(["translations" => function ($query) use ($languageCode) {
            $query->where("language_code", $languageCode);
        }]);
    }
}
