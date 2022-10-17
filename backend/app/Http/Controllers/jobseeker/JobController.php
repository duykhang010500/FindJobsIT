<?php

namespace App\Http\Controllers\jobseeker;
use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\Location;
use App\Models\Company;
use App\Models\Industry;
use App\Models\Candidate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use Validator;
class JobController extends Controller
{
    //
    public function index(Request $request)
    {
        //
        try {
            $params = [
                'id' => NULL,
                'uid' => null,
                'comp_id' => null,
                'keywords' => $request->get('keywords'),
                'locations' => $request->get('locations'),
                'industries' => $request->get('industries'),
                'tags' => NULL,
                'job_type' => $request->get('industries'),
                'level_id' => NULL,
                'salary' => NULL,
                'salary_from' => NULL,
                'salary_to' => NULL,
                'active' => NULL,
                'expire' => NULL,
                'exclude' => NULL,
                'status' => NULL,
                'sort' => NULL,
                'boost_ids' => NULL,
                'type_date' => NULL,
                'from_date' => NULL,
                'to_date' => NULL,
                'days' => NULL,
                'is_hot' => NULL,
                'unskill_job' => NULL,
                'is_urgent' => NULL,
            ];

            $result = Job::query();

            if (!empty($params['keywords'])) {
                $result = $result->where('title', 'like', '%'.$params['keywords'].'%');
            }
            if (!empty($params['locations'])) {
                $locs = is_array($params['locations']) ? $params['locations'] : explode(',', $params['locations']);
                // dd($locs);
                $result = $result->where('locations', 'like', '%'.$params['locations'].'%');
            }
            if (!empty($params['industries'])) {
                $result = $result->where('industries', 'like', '%'.$params['industries'].'%');
            }
            if (!empty($params['job_type'])) {
                $result = $result->where('job_type', 'like', '%'.$params['job_type'].'%');
            }

            $result = $result->get();
            return response()->json([
                'result' => $result,
            ], 500);
        } catch (\Exception $e) {
            echo $e->getMessage();
            return NULL;
        }
    }

    public function job_relevant_comp($id)
    {
        //
        try{
            $job = Job::findOrFail($id);
            $jobs = Job::with('company')->where('comp_id', $job->comp_id)
                        ->whereNotIn('id', [$job->id])
                        ->inRandomOrder()->take(10)->get();
            return response()->json([
                'jobs' => $jobs
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function industries()
    {
        //
        $industries = Industry::orderBy('id','desc')->get();
        return response()->json([
            'industries' => $industries
        ]);
    }

    public function byindustry($id)
    {
        //
        $industries = Industry::find($id)->jobs;
        return response()->json([
            'industries' => $industries
        ]);
    }

    public function locations()
    {
        //
        $locations = Location::orderBy('id','desc')->get();
        return response()->json([
            'locations' => $locations
        ]);
    }

    public function bylocation($id)
    {
        //
        $Location = Location::find($id);
        return response()->json([
            'Location' => $Location->jobs
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

    public function companies()
    {
        //
        $companies = Company::orderBy('id','desc')->get();
        return response()->json([
            'companies' => $companies
        ]);
    }

}
