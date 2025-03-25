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
        $products = Product::translation(ucwords($locale))->with("features")->get();

        return Inertia::render("main/product/page", [
            'products' => $products
        ]);
    }

    public function show(Request $request, String $slug)
    {
        $locale = Session::get("locale", "en");
        $productTranslation = ProductTranslation::where("slug", $slug)->with('product')->first();
        $product = ProductTranslation::where("product_id", $productTranslation->product_id)->where('language_code', $locale)->with(['product.features', 'product.faqs'])->first();

        return Inertia::render("main/product/detail", [
            'product' => $product
        ]);
    }
}
