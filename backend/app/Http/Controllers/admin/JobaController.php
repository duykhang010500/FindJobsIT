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

    public function locations()
    {
        //
        $locations = Location::orderBy('id','desc')->get();
        return response()->json([
            'locations' => $locations,
        ]);
    }

    public function location(Request $request, $id) {
        $location = Location::where('id',$id)->first();

        $fields = Validator::make($request->all(), [
            'name' => 'required|unique:cities',
        ]);

        if ($fields->fails()) {
            return response()->json($fields->errors(), 422);
        }

        ($location != null) ? $location->update(array_merge($fields->validated())) : $location = Location::create(array_merge($fields->validated()));


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
        $model = Industry::where('id',$id)->first();

        $fields = Validator::make($request->all(), [
            'name' => ['required', \Illuminate\Validation\Rule::unique('industries')->ignore($model->id)],
            'priority' => 'required',
            'status' => 'required',
        ]);

        if ($fields->fails()) {
            return response()->json($fields->errors(), 422);
        }

        ($model != null) ? $model->update(array_merge($fields->validated())) : $model = Location::create(array_merge($fields->validated()));


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