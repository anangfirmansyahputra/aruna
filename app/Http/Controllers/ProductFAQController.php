<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductFAQ;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductFAQController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $productFaqs = ProductFAQ::with('product')->get();
        $products = Product::all();

        return Inertia::render('faq/page', [
            'data' => $productFaqs,
            'products' => $products
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $products = Product::all();

        return Inertia::render('faq/form', [
            'products' => $products
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'product_id' => "required|exists:products,id",
            "question" => "required|string",
            "answer" => "required|string"
        ]);

        ProductFAQ::create($validate);

        return to_route('faqs.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductFAQ $faq)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProductFAQ $faq)
    {
        $products = Product::all();

        return Inertia::render('faq/form', [
            'products' => $products,
            'faq' => $faq
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProductFAQ $faq)
    {
        $validate = $request->validate([
            'product_id' => "required|exists:products,id",
            "question" => "required|string",
            "answer" => "required|string"
        ]);

        $faq->update($validate);
        return to_route('faqs.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductFAQ $faq)
    {
        $faq->delete();
        return to_route('faqs.index');
    }
}
