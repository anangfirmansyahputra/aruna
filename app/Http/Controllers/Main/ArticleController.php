<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Seo;
use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::latest()->get();
        $seo = Seo::where("type", "article")->first();

        return Inertia::render("main/article/page", [
            'articles' => $articles,
            'seo' => $seo
        ]);
    }

    public function show(Request $request, string $slug)
    {
        $article = Article::where(function ($query) use ($slug) {
            $query->where("en_slug", $slug)
                ->orWhere("id_slug", $slug);
        })->first();

        if (!$article) {
            abort(404);
        }

        $related_article = Article::where(function ($query) use ($slug) {
            $query->where("en_slug", "!=", $slug)
                ->orWhere("id_slug", "!=", $slug);
        })
            ->limit(5)
            ->get();

        return Inertia::render("main/article/detail", [
            'article' => $article,
            'related' => $related_article
        ]);
    }
}
