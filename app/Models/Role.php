<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole
{
    use HasFactory;

    public function menus()
    {
        return $this->belongsToMany(Menu::class, 'menu_role', 'role_id', 'menu_id');
    }

    protected function createdAt(): Attribute
    {
        return Attribute::get(fn($value) => \Carbon\Carbon::parse($value)->format('d M Y H:i'));
    }
}
