<?php

namespace App\Http\Controllers;

use App\Models\DepositoStep;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class DepositoStepController extends Controller
{
    public function index()
    {
        return Inertia::render("deposito/step/page", [
            'data' => DepositoStep::orderBy('position')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render("deposito/step/form");
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            "is_highlighted" => "nullable|string",
            "en_title" => "required|string",
            "id_title" => "required|string",
            "en_description" => "required|string",
            "id_description" => "required|string",
            "image_url" => "required|mimes:jpeg,jpg,png,gif,svg|max:2048"
        ]);

        $validate['is_highlighted'] = $validate['is_highlighted'] == 'true' ? true : false;
        $validate['position'] = DepositoStep::count() + 1;

        if ($request->hasFile("image_url")) {
            $validate["image_url"] = $request->file("image_url")->store('deposito_step', 'public');
        }

        DepositoStep::create($validate);

        return to_route("deposito-step.index");
    }

    public function show(string $id)
    {
        //
    }

    public function edit(DepositoStep $depositoStep)
    {
        return Inertia::render("deposito/step/form", [
            'data' => $depositoStep
        ]);
    }

    public function update(Request $request, DepositoStep $depositoStep)
    {
        $validate = $request->validate([
            "is_highlighted" => "nullable|string",
            "en_title" => "required|string",
            "id_title" => "required|string",
            "en_description" => "required|string",
            "id_description" => "required|string",
            'image_url' => [
                'nullable',
                Rule::when(
                    $request->hasFile('image_url'),
                    ['image', 'mimes:jpg,jpeg,png,gif', 'max:2048'],
                    ['string', 'url']
                )
            ],
        ]);

        $validate['is_highlighted'] = $validate['is_highlighted'] == 'true' ? true : false;
        $validate['position'] = $depositoStep->position;

        if ($request->hasFile('image_url')) {
            $validate['image_url'] = $request->file('image_url')->store('deposito_step', 'public');
        } else {
            unset($validate['image_url']);
        }

        $depositoStep->update($validate);

        return to_route("deposito-step.index");
    }

    public function order(Request $request)
    {
        $positions = $request->input('positions');
    
        DB::beginTransaction();
        try {
            foreach ($positions as $item) {
                DepositoStep::where('id', $item['id'])->update(['position' => $item['position']]);
            }
            DB::commit();
            return to_route("deposito-step.index");
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy(DepositoStep $depositoStep)
    {
        $depositoStep->delete();

        return to_route("deposito-step.index");
    }
}
