<?php

namespace App\Http\Controllers\admin;
use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\Location;
use App\Models\Company;
use App\Models\Industry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator,Rule;
class JobaController extends Controller
{
    //
    public function job_pendings(Request $request)
    {
        //
        $filter = $request->input('filter');
        if($filter == 'all'){
            $JobsPendings = Job::with('company','industries','locations')->where('status', Job::STATUS_PENDING)->get();
            return response()->json([
                'JobsPendings' => $JobsPendings,
            ]);
        }
        if($filter == 'active'){
            $JobsPendings = Job::with('company','industries','locations')->where('status', Job::STATUS_PUBLISHED)->get();
            return response()->json([
                'JobsPendings' => $JobsPendings,
            ]);
        }
        if($filter == 'reject'){
            $JobsPendings = Job::with('company','industries','locations')->where('status', Job::STATUS_REJECTED)->get();
            return response()->json([
                'JobsPendings' => $JobsPendings,
            ]);
        }
    }

    public function job_pending(Request $request,$id)
    {
        //
        $fields = Validator::make($request->all(), [
            'status' => 'required',
        ]);
        if ($fields->fails()) {
            return response()->json($fields->errors(), 422);
        }
        $job = Job::find($id);
        if($job){
            if($request->status == Job::STATUS_PUBLISHED || $request->status == Job::STATUS_REJECTED){
                $job->update($fields->validated());
                $job->status == Job::STATUS_PUBLISHED ? $message = 'Accept job posted.' : $message = 'Reject post job.';
                return response()->json([
                    'job' => $job,
                    'message' => $message
                ]);
            }else{
                return response()->json([
                    'message' => 'Choose status 1:STATUS_PUBLISHED; 4:STATUS_REJECTED'
                ]);
            }
        };
        return response()->json([
            'message' => 'Job does not match with our record.'
        ]);
    }

    public function locations()
    {
        //
        $locations = Location::orderBy('id','desc')->get();
        return response()->json([
            'locations' => $locations,
        ]);
    }

    public function location(Request $request, $id) {
        $fields = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100|unique:cities',
        ]);

        if ($fields->fails()) {
            return response()->json($fields->errors(), 422);
        }
        $location = Location::where('id',$id)->first();
        ($location != null) ? $location->update(($fields->validated())) : $location = Location::create(($fields->validated()));


        return response()->json([
            'location' => $location,
        ]);
    }

    public function delete_location(Request $request,$id)
    {
        //
        $model = Location::where('id',$id)->delete();

        ($model != null) ? $message = 'Location deleted successfully' : $message = 'Location not exist';
        return response()->json([
            'message' => $message
        ]);

    }

    public function industries()
    {
        //
        $industries = Industry::orderBy('id','desc')->get();
        return response()->json([
            'industries' => $industries,
        ]);
    }

    public function industry(Request $request, $id) {
        $fields = Validator::make($request->all(), [
            "name" =>'required|string|unique:industries',
            'priority' => 'required',
            'status' => 'required',
        ]);

        if ($fields->fails()) {
            return response()->json($fields->errors(), 422);
        }
        $model = Industry::where('id',$id)->first();
        ($model != null) ? $model->update(($fields->validated())) : $model = Industry::create(($fields->validated()));


        return response()->json([
            'Industry' => $model,
        ]);
    }

    public function delete_industry(Request $request,$id)
    {
        //
        $model = Industry::where('id',$id)->delete();

        ($model != null) ? $message = 'Industry deleted successfully' : $message = 'Industry not exist';
        return response()->json([
            'message' => $message
        ]);

    }

}