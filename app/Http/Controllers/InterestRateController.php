<?php

namespace App\Http\Controllers;

use App\Models\InterestRate;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InterestRateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("interest-rate/page", [
            'data' => InterestRate::with('product.translations')->get(),
            'products' => Product::with("translations")->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("interest-rate/form", [
            'products' => Product::with('translations')->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'product_id' => "required|exists:products,id",
            "tenor" => "required|numeric",
            "interest" => "required|numeric"
        ]);

        InterestRate::create($validate);

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(InterestRate $interestRate)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(InterestRate $interestRate)
    {
        return Inertia::render("interest-rate/form", [
            'products' => Product::with('translations')->get(),
            'interestRate' => $interestRate
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, InterestRate $interestRate)
    {
        $validate = $request->validate([
            'product_id' => "required|exists:products,id",
            "tenor" => "required|numeric",
            "interest" => "required|numeric"
        ]);

        $interestRate->update($validate);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InterestRate $interestRate)
    {
        $interestRate->delete();
        return back();
    }
}
