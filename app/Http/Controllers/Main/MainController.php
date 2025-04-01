<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Models\CompanyValue;
use App\Models\Product;
use App\Models\TeamProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class MainController extends Controller
{
    public function index()
    {
        $lang = Session::get("locale", "en");

        $products = Product::translation($lang)->get();

        return Inertia::render("main/home", [
            'products' => $products
        ]);
    }

    public function career()
    {
        return Inertia::render("main/career", []);
    }

    public function about()
    {
        $teams = TeamProfile::all();
        $companyValues = CompanyValue::all();

        return Inertia::render("main/about", [
            'profiles' => $teams,
            'company_values' => $companyValues
        ]);
    }

    public function contact()
    {
        return Inertia::render("main/contact");
    }
}
