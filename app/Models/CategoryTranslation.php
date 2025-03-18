<?php

namespace App\Models;

use App\Enums\LanguageCode;
use Illuminate\Database\Eloquent\Model;

class CategoryTranslation extends Model
{
    protected $fillable = [
        "name",
        "language_code",
        "description"
    ];

    protected $casts = [
        "language_code" => LanguageCode::class
    ];

    public function category()
    {
        return $this->belongsTo(CategoryTranslation::class);
    }
}
