<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductFeature;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductFeatureController extends Controller
{
    public function index()
    {
        return Inertia::render("product-feature/page", [
            'data' => ProductFeature::with('product.translations')->get(),
            'products' => Product::with("translations")->get()
        ]);
    }

    public function create()
    {
        return Inertia::render("product-feature/form", [
            'products' => Product::with('translations')->get()
        ]);
    }

    public function validate(Request $request)
    {
        return $request->validate([
            'product_id' => "required|exists:products,id",
            'en_title' => "required|string",
            'id_title' => "required|string",
            'en_description' => "required|string",
            'id_description' => "required|string",
            'icon' => "required|string"
        ]);
    }

    public function store(Request $request)
    {
        $validate = $this->validate($request);
        ProductFeature::create($validate);
        return to_route("product-features.index");
    }

    public function edit(ProductFeature $productFeature)
    {
        return Inertia::render("product-feature/form", [
            'products' => Product::with("translations")->get(),
            'data' => $productFeature->load("product.translations")
        ]);
    }

    public function update(Request $request, ProductFeature $productFeature)
    {
        $validate = $this->validate($request);
        $productFeature->update($validate);
        return to_route("product-features.index");
    }

    public function destroy(ProductFeature $productFeature)
    {
        $productFeature->delete();
        return to_route('reports.index');
    }
}
