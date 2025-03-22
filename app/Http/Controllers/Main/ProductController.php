<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $locale = Session::get("locale", "id");
        $products = Product::translation(ucwords($locale))->get();

        return Inertia::render("main/product", [
            'products' => $products
        ]);
    }
}
