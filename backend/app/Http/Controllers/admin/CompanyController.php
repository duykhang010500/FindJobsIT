<?php

namespace App\Http\Controllers\admin;
use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use Validator;
class CompanyController extends Controller
{
    //
    public function index(Request $request)
    {
        //
        $filter = $request->input('filter');
        if($filter == 'pending'){
            $companiesPendings = Company::with('employer')->where('status', Company::STATUS_PENDING)->orderBy('id','desc')->get();
            return response()->json([
                'companiesPendings' => $companiesPendings,
            ]);
        }
        if($filter == 'active'){
            $companiesActive = Company::with('employer')->where('status', Company::STATUS_PUBLISHED)->orderBy('id','desc')->get();
            return response()->json([
                'companiesActive' => $companiesActive,
            ]);
        }
        if($filter == 'reject'){
            $companiesReject = Company::with('employer')->where('status', Company::STATUS_REJECTED)->orderBy('id','desc')->get();
            return response()->json([
                'companiesReject' => $companiesReject,
            ]);
        }
        $companiesActive = Company::with('employer')->where('status', Company::STATUS_PUBLISHED)->orderBy('id','desc')->get();
        return response()->json([
            'companiesActive' => $companiesActive,
        ]);
    }

    public function company_status(Request $request,$id)
    {
        //
        $fields = Validator::make($request->all(), [
            'status' => 'required',
        ]);
        if ($fields->fails()) {
            return response()->json($fields->errors(), 422);
        }
        $company = Company::find($id);
        if($company){
            if($request->status == Company::STATUS_PUBLISHED || $request->status == Company::STATUS_REJECTED || $request->status == Company::STATUS_CLOSED){
                $company->update($fields->validated());
                if($company->status == Company::STATUS_PUBLISHED){
                    $company->employer->status = 1;
                    $company->employer->save();
                    $message = 'Accept company information.';
                }
                if($company->status == Company::STATUS_CLOSED){
                    $company->employer->status = 1;
                    $company->employer->save();
                    $message = 'Inactive company.';
                } 
                if($company->status == Company::STATUS_REJECTED){
                    $company->employer->status = 3;
                    $company->employer->save();
                    $message = 'Reject company.';
                }
                return response()->json([
                    'company' => $company,
                    'message' => $message
                ]);
            }else{
                return response()->json([
                    'message' => 'Choose status 1:STATUS_PUBLISHED; 3:STATUS_REJECTED'
                ]);
            }
        };
        return response()->json([
            'message' => 'Company does not match with our record.'
        ]);
    }

    public function detail(Request $request, $id)
    {
        $company = Company::with(['employer'])->where('id', $id)->first();
        return response()->json([
            'company' => $company,
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

}
