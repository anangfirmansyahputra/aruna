<?php

namespace App\Http\Controllers;

use App\Enums\CollateralType;
use App\Models\CreditProposal;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class CreditProposalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("credit-proposal/page", [
            'data' => CreditProposal::with('product.translations')->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $products = Product::where("is_credit", true)->translation("ID")->get();
        return Inertia::render("credit-proposal/form", [
            'products' => $products
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            "product_id" => "required|numeric|exists:products,id",
            "plafond_amount" => "required|numeric",
            "usage_purpose" => "required|string",
            "debtor_name" => "required|string",
            "debtor_date_birth" => "required|date",
            "debtor_no_ktp" => "required|string",
            "debtor_npwp" => "required|string",
            "debtor_no_hp" => "required|string",
            "debtor_email" => "required|string|email",
            "collateral_name_reference" => "string|nullable",
            "collateral_address" => "string|nullable",
            "collateral_type" => ["required", Rule::in(array_column(CollateralType::cases(), "value"))],
            "collateral_photo_ktp" => 'required|mimes:jpeg,jpg,png,gif|max:1000',
        ]);

        try {
            $validate["collateral_photo_ktp"] = $request->file("collateral_photo_ktp")->store("ktp", "public");
            $validate["debtor_date_birth"] = Carbon::parse($request->debtor_date_birth)->toDateString();


            CreditProposal::create($validate);
            return to_route("credit-proposals.index");
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(CreditProposal $creditProposal)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CreditProposal $creditProposal)
    {
        $products = Product::translation("ID")->get();
        return Inertia::render("credit-proposal/form", [
            'products' => $products,
            'data' => $creditProposal
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CreditProposal $creditProposal)
    {
        $validate = $request->validate([
            "product_id" => "required|numeric|exists:products,id",
            "plafond_amount" => "required|numeric",
            "usage_purpose" => "required|string",
            "debtor_name" => "required|string",
            "debtor_date_birth" => "required|date",
            "debtor_no_ktp" => "required|string",
            "debtor_npwp" => "required|string",
            "debtor_no_hp" => "required|string",
            "debtor_email" => "required|string|email",
            "collateral_name_reference" => "string|nullable",
            "collateral_address" => "string|nullable",
            "collateral_type" => ["required", Rule::in(array_column(CollateralType::cases(), "value"))],
            "collateral_photo_ktp" => [
                'nullable',
                Rule::when(
                    $request->hasFile('image_url'),
                    ['image', 'mimes:jpg,jpeg,png,gif', 'max:2048'],
                    ['string', 'url']
                )
            ],
        ]);

        if ($request->hasFile("collateral_photo_ktp")) {
            $validate["collateral_photo_ktp"] = $request->file("collateral_photo_ktp")->store("ktp", "public");
        } else {
            unset($validate["collateral_photo_ktp"]);
        }

        $validate["debtor_date_birth"] = Carbon::parse($request->debtor_date_birth)->toDateString();
        $creditProposal->update($validate);


        return to_route("credit-proposals.index");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CreditProposal $creditProposal)
    {
        //
    }
}
