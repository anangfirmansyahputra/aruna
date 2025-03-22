<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class LocaleController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, String $lang)
    {
        if (!in_array($lang, ['en', 'id'])) {
            abort(403);
        }

        Session::put("locale", $lang);

        return redirect()->back();
    }
}
