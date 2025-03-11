<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $article = Article::all();
        return Inertia::render('article/page', [
            'data' => $article
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('article/form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'title' => 'required|string|unique:articles,title',
            'slug' => 'required|string|unique:articles,title',
            'keywords' => 'required|string',
            'tags' => 'required|string',
            'meta_description' => 'required|string',
            'content' => 'required|string',
            'image_url' => 'mimes:jpeg,jpg,png,gif|max:1000',
            'category' => 'required|string',
            'detail_information' => 'string'
        ]);

        $validate['image_url'] = $request->file('image_url')->store('articles', 'public');

        try {
            Article::create($validate);
            return to_route('articles.index');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        return Inertia::render('article/form', [
            'article' => $article
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
        return Inertia::render('article/form', [
            'article' => $article
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article)
    {
        $validate = $request->validate([
            'title' => "required|string|unique:articles,title,{$article->id}",
            'slug' => "required|string|unique:articles,title,{$article->id}",
            'keywords' => 'required|string',
            'tags' => 'required|string',
            'meta_description' => 'required|string',
            'content' => 'required|string',
            'category' => 'required|string',
            'detail_information' => 'string',
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
            $validate['image_url'] = $request->file('image_url')->store('articles', 'public');
        } else {
            unset($validate['image_url']);
        }
        try {
            $article->update($validate);
            return to_route('articles.index');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        $article->delete();
        return to_route('articles.index');
    }
}
