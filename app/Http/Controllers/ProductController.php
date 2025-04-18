<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\InterestRate;
use App\Models\Product;
use App\Models\ProductFAQ;
use App\Models\ProductFeature;
use App\Models\ProductRequirement;
use App\Models\ProductTranslation;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with(['category.translations', 'translations'])->get();
        return Inertia::render("product/page", ['data' => $products]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::translation("ID")->get();
        return Inertia::render('product/form', ['categories' => $categories]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->merge([
            'translations' => json_decode($request->input('translations'), true)
        ]);

        $validate = $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'is_credit' => ['nullable', 'string'],
            'image_url' => 'mimes:jpeg,jpg,png,gif|max:1000',
            'type_calculation' => ['required', 'string'],
            "translations" => "required|array",
            "translations.*.name" => "required|string",
            "translations.*.language_code" => "required|string",
            "translations.*.collateral_name" => "required|string",
            "translations.*.slug" => "required|string",
            "translations.*.keywords" => "required|array",
            "translations.*.meta_descriptions" => "required|string",
            "translations.*.description" => "required|string",
            "translations.*.heading_one" => "required|string",
            "translations.*.heading_two" => "required|string",
        ]);

        $validate['is_credit'] = $validate['is_credit'] == 'true' ? true : false;

        try {
            DB::beginTransaction();

            $imagePath = $request->file('image_url')->store('products', 'public');
            $validate['image_url'] = $imagePath;

            $product = Product::create($validate);
            $product->translations()->createMany($validate["translations"]);

            DB::commit();
            return redirect()->route('products.edit', $product->id);
        } catch (QueryException $e) {
            DB::rollBack();
            if ($e->errorInfo[1] == 1062) {
                return back()->with('error', 'Title or slug alredy exist!');
            }
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
        $categories = Category::with("translations")->get();
        $features = ProductFeature::where('product_id', $product->id)->get();
        $requirements = ProductRequirement::where("product_id", $product->id)->get();
        $interestRates = InterestRate::where("product_id", $product->id)->get();
        $faqs = ProductFAQ::where("product_id", $product->id)->get();

        return Inertia::render('product/form', [
            'product' => $product->load(["translations"]),
            'categories' => $categories,
            'features' => $features,
            'requirements' => $requirements,
            'interest_rates' => $interestRates,
            'faqs' => $faqs
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $request->merge([
            'translations' => json_decode($request->input('translations'), true)
        ]);

        $validate = $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'type_calculation' => ['required', 'string'],
            "translations" => "required|array",
            'is_credit' => ['nullable', 'string'],
            'image_url' => [
                'nullable',
                Rule::when(
                    $request->hasFile('image_url'),
                    ['image', 'mimes:jpg,jpeg,png,gif', 'max:2048'],
                    ['string', 'url']
                )
            ],
        ]);


        if ($request->hasFile('image_url')) {
            $validate['image_url'] = $request->file('image_url')->store('products', 'public');
        } else {
            unset($validate['image_url']);
        }

        $validate['is_credit'] = $validate['is_credit'] == 'true' ? true : false;

        try {
            DB::beginTransaction();

            $product->update($validate);

            foreach ($validate["translations"] as $translation) {
                $exist = ProductTranslation::where("product_id", $product->id)
                    ->where("language_code", $translation["language_code"])
                    ->first();

                if ($exist) {
                    $exist->update($translation);
                }
            }

            DB::commit();
            return to_route('products.index');
        } catch (\Exception $e) {
            DB::rollBack();
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
