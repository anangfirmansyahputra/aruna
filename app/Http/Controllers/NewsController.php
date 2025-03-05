<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $news = News::all();
        return Inertia::render('news/page', [
            'data' => $news
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('news/form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'title' => 'required|string|unique:news,title',
            'slug' => 'required|string|unique:news,title',
            'keywords' => 'required|string',
            'tags' => 'required|string',
            'meta_description' => 'required|string',
            'content' => 'required|string',
            'image_url' => 'mimes:jpeg,jpg,png,gif|max:1000',
        ]);

        $validate['image_url'] = $request->file('image_url')->store('news', 'public');

        try {
            News::create($validate);
            return to_route('news.index');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(News $news)
    {
        return Inertia::render('news/form', [
            'news' => $news
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(News $news)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, News $news)
    {
        $validate = $request->validate([
            'title' => "required|string|unique:news,title,{$news->id}",
            'slug' => "required|string|unique:news,title,{$news->id}",
            'keywords' => 'required|string',
            'tags' => 'required|string',
            'meta_description' => 'required|string',
            'content' => 'required|string',
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
            $validate['image_url'] = $request->file('image_url')->store('news', 'public');
        } else {
            unset($validate['image_url']);
        }
        try {
            $news->update($validate);
            return to_route('news.index');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(News $news)
    {
        $news->delete();
        return to_route('news.index');
    }
}
