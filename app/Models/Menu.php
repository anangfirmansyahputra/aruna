<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    protected $fillable = [
        'group',
        'icon',
        'name',
        'path'
    ];

    protected function createdAt(): Attribute
    {
        return Attribute::get(fn($value) => \Carbon\Carbon::parse($value)->format('d M Y'));
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'menu_role', 'menu_id', 'role_id');
    }
}
