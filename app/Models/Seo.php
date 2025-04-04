<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Seo extends Model
{
    protected $fillable = [
        'id_title',
        'en_title',
        "id_meta_descriptions",
        "en_meta_descriptions",
        "id_keywords",
        "en_keywords",
        "type"
    ];

    protected function casts()
    {
        return [
            'id_keywords' => "array",
            'en_keywords' => "array",
        ];
    }
}
