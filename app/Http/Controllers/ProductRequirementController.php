<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductRequirement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductRequirementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("product-requirement/page", [
            'data' => ProductRequirement::with('product.translations')->get(),
            'products' => Product::with("translations")->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("product-requirement/form", [
            'products' => Product::with("translations")->get()
        ]);
    }

    public function validate(Request $request)
    {
        return $request->validate([
            "id_title" => "required|string",
            "en_title" => "required|string",
            "items" => "required|string",
            'product_id' => "required|exists:products,id"
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $this->validate($request);
        ProductRequirement::create($validate);
        return to_route("product-requirements.index");
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductRequirement $productRequirement)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProductRequirement $productRequirement)
    {
        return Inertia::render("product-requirement/form", [
            'products' => Product::with("translations")->get(),
            'data' => $productRequirement
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProductRequirement $productRequirement)
    {
        $validate = $this->validate($request);
        $productRequirement->update($validate);
        return to_route("product-requirements.index");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductRequirement $productRequirement)
    {
        $productRequirement->delete();
        return to_route("product-requirements.index");
    }
}
