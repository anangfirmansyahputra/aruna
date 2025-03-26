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
        $localizedProduct = ProductTranslation::where("product_id", $productTranslation->product_id)
            ->where("language_code", $locale)
            ->first();

        if ($localizedProduct && $localizedProduct->slug !== $slug) {
            return redirect("/products/{$localizedProduct->slug}");
        }

        return Inertia::render("main/product/detail", [
            'product' => $localizedProduct
                ->load([
                    'product.features',
                    'product.faqs',
                    'product.requirements',
                    'product.interestRates' => function ($query) {
                        $query->orderBy('tenor', 'asc');
                    }
                ])
        ]);
    }
}
