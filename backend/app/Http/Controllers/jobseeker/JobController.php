<?php

namespace App\Http\Controllers\jobseeker;
use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\Resume;
use App\Models\Location;
use App\Models\Company;
use App\Models\Industry;
use App\Models\Candidate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Pagination\LengthAwarePaginator;
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
                'job_type' => $request->get('job_type'),
                'level_id' => $request->get('level_id'),
                'salary' => $request->get('salary'),
                'salary_from' => $request->get('salary_from'),
                'salary_to' => $request->get('salary_to'),
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
                $ids = array_map(function ($value) {
                    return (int) $value;
                }, $locs);

                $result = $result->whereHas('locations', function($query) use ($ids) {
                    $query->whereIn('location_id', $ids); // But this does
                });
            }
            if (!empty($params['industries'])) {
                $locs = is_array($params['industries']) ? $params['industries'] : explode(',', $params['industries']);
                $ids = array_map(function ($value) {
                    return (int) $value;
                }, $locs);

                $result = $result->whereHas('industries', function($query) use ($ids) {
                    $query->whereIn('industry_id', $ids); // But this does
                });
            }
            if (!empty($params['job_type'])) {
                $result = $result->where('job_type', $params['job_type']);
            }
            if (!empty($params['salary'])) {
                $result = $result->where('salary', $params['salary']);
            }
            if (!empty($params['level_id'])) {
                $result = $result->where('level_id', $params['level_id']);
            }
            if (!empty($params['salary_from']) && !empty($params['salary_to'])) {
                $minFilter = $params['salary_from'];
                $maxFilter = $params['salary_to'];
                $result->where(function($query) use ($minFilter,$maxFilter) {
                    $query->where('salary_to', '>' , $minFilter);
                    $query->where('salary_from', '<',  $maxFilter);
                });
            }
            // dd($params);
            $result = $result->with('company','industries','locations')->orderBy('id','desc')->get();

            $currentPage = LengthAwarePaginator::resolveCurrentPage();
            // Create a new Laravel collection from the array data
            $itemCollection = collect($result);
            // Define how many items we want to be visible in each page
            $perPage = 10;
            // Slice the collection to get the items to display in current page
            $currentPageItems = $itemCollection->slice(($currentPage * $perPage) - $perPage, $perPage)->values();
            // Create our paginator and pass it to the view
            $paginatedItems= new LengthAwarePaginator($currentPageItems , count($itemCollection), $perPage);
            // set url path for generted links
            $paginatedItems->setPath($request->url());
            return response()->json([
                'result' => $paginatedItems,
            ]);
        } catch (\Exception $e) {
            echo $e->getMessage();
            return NULL;
        }
    }

    public function detail($id)
    {
        //
        try{
            $job = Job::with('company','industries','locations')->where('id',$id)->first();
            return response()->json([
                'job' => $job
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ]);
        }
    }

    public function job_relevant_comp(Request $request,$id)
    {
        //
        try{
            $job = Job::findOrFail($id);
            $jobs = Job::with('company','industries','locations')->where('comp_id', $job->comp_id)
                        ->whereNotIn('id', [$job->id])
                        ->inRandomOrder()->take(10)->get();
            $currentPage = LengthAwarePaginator::resolveCurrentPage();
            // Create a new Laravel collection from the array data
            $itemCollection = collect($jobs);
            // Define how many items we want to be visible in each page
            $perPage = 10;
            // Slice the collection to get the items to display in current page
            $currentPageItems = $itemCollection->slice(($currentPage * $perPage) - $perPage, $perPage)->values();
            // Create our paginator and pass it to the view
            $paginatedItems= new LengthAwarePaginator($currentPageItems , count($itemCollection), $perPage);
            // set url path for generted links
            $paginatedItems->setPath($request->url());
            return response()->json([
                'result' => $paginatedItems
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
        try{
            $member = auth('sanctum')->user();
            $job = Job::findOrFail($id);

            // check member apply
            $c_mid = Candidate::where([
                ['member_id', '=', $member -> id],
                ['job_id', '=', $job -> id],
            ])->first();

            if (!empty($c_mid))
                return response()->json([
                    'message' => 'Job applied',
                ]);

            if($member->id){
                $candidate = new Candidate;
                $candidate -> member_id = $member -> id;
                $candidate -> job_id = $job -> id;
                $candidate -> comp_id = $job -> comp_id;
                $candidate -> resume_file = $request -> post('resume_file');
                $candidate -> save();
            }
            if(!$member->resume){
                $resume = new Resume;
                $resume -> resume_status = 1; //active resume
                if (!empty($job->level))
                    $resume->level = $job->level;
                if (!empty($job->degree))
                    $resume->degree = $job->degree;
                if (!empty($job->resume_title))
                    $resume->resume_title = $job->resume_title;

                $resume->resume_file = $request -> post('resume_file');

                $resume -> save();

                $member -> resume_id = $resume -> id;
                $member -> save();

                if(!empty($job->industries)){
                    $data = explode(',', $job->industries);
                    foreach ($data as $key => $value) {
                        $value = (int)$value;
                        $resume->industries()->attach($value);
                        $resume->save();
                    }
                }
                if(!empty($job->locations)){
                    $data = explode(',', $job->locations);
                    foreach ($data as $key => $value) {
                        $value = (int)$value;
                        $resume->locations()->attach($value);
                        $resume->save();
                    }
                }
            }
            return response()->json([
                'message' => 'Apply successfully',
                'candidate' => $candidate,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
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
