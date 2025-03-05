<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with('category')->get();
        return Inertia::render("product/page", ['data' => $products]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        return Inertia::render('product/form', ['categories' => $categories]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validate = $request->validate([
            'name' => ['required', "string"],
            'category_id' => ['required', 'exists:categories,id'],
            'collateral_name' => ['required', 'string'],
            'is_credit' => ['nullable', 'string'],
            'image_url' => 'mimes:jpeg,jpg,png,gif|max:1000',
        ]);

        try {
            $imagePath = $request->file('image_url')->store('products', 'public');
            $validate['image_url'] = $imagePath;

            Product::create($validate);
            return to_route('products.index');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $categories = Category::all();

        return Inertia::render('product/form', [
            'product' => $product,
            'categories' => $categories
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $categories = Category::all();

        return Inertia::render('product/form', [
            'product' => $product,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $validate = $request->validate([
            'name' => ['required', "string"],
            'category_id' => ['required', 'exists:categories,id'],
            'collateral_name' => ['required', 'string'],
            'is_credit' => ['nullable', 'string'],
            'image_url' => [
                'nullable',
                Rule::when(
                    $request->hasFile('image_url'),
                    ['image', 'mimes:jpg,jpeg,png,gif', 'max:2048'],
                    ['string', 'url']
                )
            ]
        ]);

        if ($request->hasFile('image_url')) {
            $validate['image_url'] = $request->file('image_url')->store('products', 'public');
        } else {
            unset($validate['image_url']);
        }

        $validate['is_credit'] = $validate['is_credit'] == 'true' ? true : false;

        try {
            $product->update($validate);

            return to_route('products.index');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return to_route('products.index');
    }
}
