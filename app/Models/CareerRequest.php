<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class CareerRequest extends Model
{
    protected $fillable = [
        'career_id',
        'name',
        'email',
        'no_hp',
        'cv'
    ];

    public function career()
    {
        return $this->belongsTo(Career::class);
    }

    protected function createdAt(): Attribute
    {
        return Attribute::get(fn($value) => \Carbon\Carbon::parse($value)->format('d M Y'));
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function (CareerRequest $careerRequest) {
            if ($careerRequest->cv) {
                Storage::disk('public')->delete($careerRequest->cv);
            }
        });

        static::updating(function ($careerRequest) {
            if ($careerRequest->isDirty('cv')) {
                $oldImage = $careerRequest->getOriginal('cv');

                if ($oldImage) {
                    Storage::disk('public')->delete($oldImage);
                }
            }
        });
    }
}
