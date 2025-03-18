<?php

namespace App\Models;

use App\Enums\CollateralType;
use Illuminate\Database\Eloquent\Model;

class CreditProposal extends Model
{
    protected $guarded = [];

    protected $casts = [
        "collateral_type" => CollateralType::class
    ];
}
