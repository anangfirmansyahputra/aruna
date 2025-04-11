<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Models\Career;
use App\Models\Seo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CareerController extends Controller
{
    public function index()
    {
        $seo = Seo::where("type", "career")->first();
        return Inertia::render("main/career/page", [
            'seo' => $seo
        ]);
    }

    public function all()
    {
        $careers = Career::latest()->get();
        $seo = Seo::where("type", "career")->first();
        return Inertia::render("main/career/all", [
            'seo' => $seo,
            'careers' => $careers
        ]);
    }
}
