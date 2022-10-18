<?php

namespace App\Http\Controllers\admin;
use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator;
class MemberaController extends Controller
{
    //

    public function index()
    {
        //
        $members = Member::with('degree','location','resume','level')->orderBy('id','desc')->get();
        return response()->json([
            'data' => $members,
        ]);
    }

}