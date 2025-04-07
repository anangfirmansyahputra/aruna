<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CreditProposalController extends Controller
{
    public function index()
    {
        return Inertia::render("main/credit/form");
    }
}
