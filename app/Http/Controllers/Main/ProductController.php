<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductTranslation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $locale = Session::get("locale", "id");
        $products = Product::translation(ucwords($locale))->get();

        return Inertia::render("main/product/page", [
            'products' => $products
        ]);
    }

    public function show(Request $request, String $slug)
    {
        $product = ProductTranslation::where("slug", $slug)->with('product')->first();

        return Inertia::render("main/product/detail", [
            'product' => $product
        ]);
    }
}
