<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\CategoryTranslation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::with("translations")->get();

        return Inertia::render('category/page', [
            'data' => $categories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("category/form");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            "translations" => "required|array",
            "translations.*.name" => "required|string",
            "translations.*.language_code" => "required|string",
        ]);

        try {
            $category = Category::create();
            $category->translations()->createMany($validate["translations"]);

            return to_route('categories.index');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return Inertia::render('category/form', [
            'category' => $category
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return Inertia::render('category/form', [
            'data' => $category->load("translations")
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {

        $validate = $request->validate([
            "translations" => "required|array",
        ]);

        DB::beginTransaction();

        try {
            foreach ($validate["translations"] as $translation) {
                $exist =  CategoryTranslation::where("category_id", $category->id)
                    ->where("language_code", $translation["language_code"])
                    ->first();

                if ($exist) {
                    $exist->update($translation);
                }
            }

            DB::commit();
            return to_route('categories.index');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();

        return to_route('categories.index');
    }
}
