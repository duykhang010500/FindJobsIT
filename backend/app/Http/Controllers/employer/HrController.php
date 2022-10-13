<?php

namespace App\Http\Controllers\employer;
use App\Http\Controllers\Controller;
use App\Models\Employer;
use App\Models\Company;
use App\Models\Job;
use App\Models\Candidate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator;
class HrController extends Controller
{
    //
    public function dashboard()
    {
        //
        $employers = Employer::orderBy('id','desc')->get();
        return response()->json([
            'data' => $employers,
        ]);
    }

    public function job(Request $request)
    {

        // dd(auth()->user()->company->id);
        $validator = Validator::make($request->all(), [
            'title' => 'required|unique:jobs',
            'job_type' => 'required',
            'level_id' => 'required',
            'industries' => 'required',
            'degree_id' => 'required',
            'locations' => 'required',
            'job_description' => 'required',
            'job_requirement' => 'required',
            'company_name' => 'required',
            'contact_name' => 'required',
            'contact_emails' => 'required',
            // 'status' => 1,
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $job = Job::create(array_merge(
            $validator->validated(),
            ['comp_id' => auth()->user()->company->id,

            ]
        ));
        // dd(1);
        if(!empty($request->industries)){
            $data = explode(',', $request->industries);
            foreach ($data as $key => $value) {
                $value = (int)$value;
                $job->industries()->attach($value);
                $job->save();
            }
        }

        if(!empty($request->locations)){
            $data = explode(',', $request->locations);
            foreach ($data as $key => $value) {
                $value = (int)$value;
                $job->locations()->attach($value);
                $job->save();
            }
        }
        return response()->json([
            'job' => $job,
        ]);
    }

    public function candidates(Request $request){
        $model = new Candidate;

        $item = $model->where([
            ['comp_id', '=', auth()->user()->company->id],
            // ['job_id', '=', $job -> id],
        ])->get();
        return response()->json([
            'candidate' => $item
        ]);

    }


}