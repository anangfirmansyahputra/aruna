<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CareerRequest extends Model
{
    protected $fillable = [
        'career_id',
        'name',
        'email',
        'no_hp',
        'cv'
    ];
}
