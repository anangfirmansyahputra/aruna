<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Mail\ContactMail;
use App\Models\Article;
use App\Models\CompanyValue;
use App\Models\CreditProposal;
use App\Models\Faq;
use App\Models\Product;
use App\Models\Report;
use App\Models\Seo;
use App\Models\TeamProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class MainController extends Controller
{
    public function index()
    {
        $lang = Session::get("locale", "en");
        $seo = Seo::where("type", "home")->first();
        $articles = Article::latest()->get();

        $products = Product::translation($lang)->get();

        return Inertia::render("main/home", [
            'products' => $products,
            'seo' => $seo,
            'articles' => $articles
        ]);
    }

    public function about()
    {
        $teams = TeamProfile::all();
        $companyValues = CompanyValue::all();
        $seo = Seo::where("type", "about")->first();
        $reports = Report::latest()->get();

        return Inertia::render("main/about", [
            'profiles' => $teams,
            'company_values' => $companyValues,
            'seo' => $seo,
            'reports' => $reports
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

    public function credit()
    {
        $lang = strtoupper(Session::get("lang", "id"));

        $creditProducts = Product::where("is_credit", true)->translation($lang)->get();

        return Inertia::render("main/credit/form", [
            'credit_products' => $creditProducts
        ]);
    }

    public function creditStore(Request $request)
    {

        $validate = $request->validate([
            "product_id" => "required|numeric|exists:products,id",
            "plafond_amount" => "required|numeric",
            "usage_purpose" => "required|string",
            "debtor_name" => "required|string",
            "debtor_date_birth" => "required|string",
            "debtor_no_ktp" => "required|string",
            "debtor_npwp" => "required|string",
            "debtor_no_hp" => "required|string",
            "debtor_email" => "required|string|email",
            "collateral_name_reference" => "string|nullable",
            "collateral_address" => "string|nullable",
            "collateral_type" => "required|string",
            "collateral_photo_ktp" => 'required|mimes:jpeg,jpg,png,gif|max:1000',
        ]);

        try {
            $path = $request->file("collateral_photo_ktp")->store("ktp", "public");

            DB::table('credit_proposals')->insert([
                'product_id' => $validate['product_id'],
                'plafond_amount' => $validate['plafond_amount'],
                'usage_purpose' => $validate['usage_purpose'],
                'debtor_name' => $validate['debtor_name'],
                'debtor_date_birth' => $validate['debtor_date_birth'],
                'debtor_no_ktp' => $validate['debtor_no_ktp'],
                'debtor_npwp' => $validate['debtor_npwp'],
                'debtor_no_hp' => $validate['debtor_no_hp'],
                'debtor_email' => $validate['debtor_email'],
                'collateral_name_reference' => $validate['collateral_name_reference'] ?? null,
                'collateral_address' => $validate['collateral_address'] ?? null,
                'collateral_type' => $validate['collateral_type'],
                'collateral_photo_ktp' => $path,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            return back();
        } catch (\Exception $e) {
            dd($e->getMessage());
            return back()->with('error', $e->getMessage());
        }
    }
}
