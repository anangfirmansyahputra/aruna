<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Models\DepositoCarousel;
use App\Models\DepositoStep;
use App\Models\Seo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepositoController extends Controller
{
    public function index()
    {
        $seo = Seo::where("type", "e-deposito")->first();
        $carousels = DepositoCarousel::select("id", "id_title", "en_title", "id_description", "en_description", "image_url")->get();
        $steps = DepositoStep::all();

        return Inertia::render("main/e-deposito/page", [
            'seo' => $seo,
            'carousels' => $carousels,
            'steps' => $steps
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
