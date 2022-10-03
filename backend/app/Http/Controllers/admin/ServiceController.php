<?php

namespace App\Http\Controllers\admin;
use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use Validator;
class ServiceController extends Controller
{
    //
    public function index()
    {
        //
        $services = Service::orderBy('id','desc')->get();
        return response()->json([
            'services' => $services,
        ]);
    }

    public function store(Request $request,$id)
    {
        //
        $model = Service::where('id',$id)->first();

        $fields = Validator::make($request->all(), [
            'name' => 'required|string|between:2,250|unique:services',
            'note' => 'required',
            'service_type' => 'required',
            'days' => 'required',
            'priority' => 'required',
            'price' => 'required',
            'discount' => 'required',
            'status' => 'required',
        ]);

        if ($fields->fails()) {
            return response()->json($fields->errors(), 422);
        }

        ($model != null) ? $model->update(array_merge($fields->validated())) : $model = Service::create(array_merge($fields->validated()));

        return response()->json([
            'service' => $model,
        ]);

    }

    public function delete(Request $request,$id)
    {
        //
        $model = Service::where('id',$id)->delete();

        ($model != null) ? $message = 'Service deleted successfully' : $message = 'service not exist';
        return response()->json([
            'message' => $message
        ]);

    }


}
