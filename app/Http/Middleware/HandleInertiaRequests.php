<?php

namespace App\Http\Middleware;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        $locale = Session::get("locale", 'id');
        $categories = Category::with(['products.translations', 'translations'])->get();

        App::setLocale($locale);

        return array_merge(parent::share($request), [
            'auth' => $request->user(),
            'menus' => $user ? $user->menus()->sortBy('order')->values() : null,
            'flash' => [
                'error' => session('error')
            ],
            'permissions' => $user ? $user->getAllPermissions()->pluck('name') : [],
            'locale' => $locale,
            'categories' => $categories,
            "crisp_website_id" => config("frontend.crisp_website_id"),
            'app_url' => config("frontend.app_url"),
        ]);
    }
}
