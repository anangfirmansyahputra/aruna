<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Mail\ContactMail;
use App\Models\CompanyValue;
use App\Models\Faq;
use App\Models\Product;
use App\Models\Seo;
use App\Models\TeamProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class MainController extends Controller
{
    public function index()
    {
        $lang = Session::get("locale", "en");
        $seo = Seo::where("type", "home")->first();

        $products = Product::translation($lang)->get();

        return Inertia::render("main/home", [
            'products' => $products,
            'seo' => $seo
        ]);
    }

    public function career()
    {
        $seo = Seo::where("type", "career")->first();
        return Inertia::render("main/career", [
            'seo' => $seo
        ]);
    }

    public function about()
    {
        $teams = TeamProfile::all();
        $companyValues = CompanyValue::all();
        $seo = Seo::where("type", "about")->first();

        return Inertia::render("main/about", [
            'profiles' => $teams,
            'company_values' => $companyValues,
            'seo' => $seo
        ]);
    }

    public function contact()
    {
        $seo = Seo::where("type", "contact")->first();
        return Inertia::render("main/contact", [
            'seo' => $seo
        ]);
    }

    public function faq()
    {
        $seo = Seo::where("type", "faq")->first();
        return Inertia::render("main/faq", [
            'seo' => $seo,
            'faqs' => Faq::all()
        ]);
    }

    public function sendMailContact(Request $request)
    {
        $validate = $request->validate([
            'first_name' => "required|string",
            "last_name" => "required|string",
            "no_hp" => "required|string",
            "email" => "required|string|email",
            "subject" => "required|string",
            "message" => "required|string"
        ]);

        Mail::to(env("SEND_EMAIL_TO", "anangfirmansyahp5@gmail.com"))->send(new ContactMail($validate));
        return Inertia::render("main/contact");
    }
}
