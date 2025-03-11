<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('report/page', [
            'data' => Report::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('report/form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'title' => 'required|string',
            'year' => 'required|date_format:Y',
            'file' => 'required|mimes:pdf|max:2048',
        ]);

        $validate['file'] = $request->file('file')->store('reports', 'public');

        Report::create($validate);

        return to_route("reports.index");
    }

    /**
     * Display the specified resource.
     */
    public function show(Report $report)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Report $report)
    {
        return Inertia::render('report/form', [
            'report' => $report
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Report $report)
    {
        $validate = $request->validate([
            'title' => 'required|string',
            'year' => 'required|date_format:Y',
            'file' => [
                'nullable',
                Rule::when(
                    $request->hasFile('file'),
                    ['file', 'mimes:pdf', 'max:2048'],
                    ['string', 'url']
                )
            ],
        ]);

        if ($request->hasFile('file')) {
            $validate['file'] = $request->file('file')->store('reports', 'public');
        } else {
            unset($validate['file']);
        }

        $report->update($validate);

        return to_route("reports.index");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Report $report)
    {
        $report->delete();
        return to_route('reports.index');
    }
}
