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
        $productFaqs = ProductFAQ::with('product.translations')->get();
        $products = Product::with('translations')->get();

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
        $products = Product::with("translations")->get();

        return Inertia::render('faq/form', [
            'products' => $products
        ]);
    }

    public function validate(Request $request)
    {
        return $request->validate([
            'product_id' => "required|exists:products,id",
            "id_question" => "required|string",
            "en_question" => "required|string",
            "en_answer" => "required|string",
            "id_answer" => "required|string"
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validate = $this->validate($request);
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
        $products = Product::with('translations')->get();

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
        $validate = $this->validate($request);
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
