<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class Category extends Model
{
    protected $fillable = [
        'name',
        'description'
    ];

    protected function createdAt(): Attribute
    {
        return Attribute::get(fn($value) => \Carbon\Carbon::parse($value)->format('d M Y'));
    }
}
