<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Models\Seo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepositoController extends Controller
{
    public function index()
    {
        $seo = Seo::where("type", "e-deposito")->first();
        return Inertia::render("main/e-deposito/page", [
            'seo' => $seo
        ]);
    }

    public function form()
    {
        $seo = Seo::where("type", "e-deposito-form")->first();
        return Inertia::render("main/e-deposito/form", [
            'seo' => $seo
        ]);
    }
}
