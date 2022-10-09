<?php

namespace App\Http\Controllers\jobseeker;
use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\Candidate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use Validator;
class JobController extends Controller
{
    //
    public function index()
    {
        //
        $jobs = Job::orderBy('id','desc')->get();
        return response()->json([
            'jobs' => $jobs
        ]);
    }

    public function store(Request $request)
    {
        //
        $fields = Validator::make($request->all(), [
            'name' => 'required|string|between:2,250|unique:companies',
            'company_size' => 'required',
            'industry_id' => 'required',
            'website' => 'required',
        ]);

        if ($fields->fails()) {
            return response()->json($fields->errors(), 422);
        }

        $company = Company::create(array_merge($fields->validated()));

        return response()->json([
            'company' => $company,
        ]);

    }

    public function apply(Request $request,$id)
    {
        //
        $member = auth('sanctum')->user();
        $job = Job::findOrFail($id);

        $candidate = new Candidate;
       
        $candidate -> member_id = $member -> id;
        $candidate -> job_id = $job -> id;
        $candidate -> comp_id = $job -> comp_id;
        $candidate -> resume_file = $request -> post('resume_file');
        // dd($candidate -> resume_file);

        $c_mid = Candidate::where([
            ['member_id', '=', $member -> id],
            ['job_id', '=', $job -> id],
        ])->get();
        if ($c_mid)
            return response()->json([
                'message' => 'applied_this_job',
            ]);
        $candidate -> save();
            return response()->json([
                'message' => ' Aplly successfully',
                'candidate' => $candidate,
            ]);
    }

}
