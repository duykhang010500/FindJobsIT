<?php

namespace App\Http\Controllers\jobseeker;
use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator;
class MyController extends Controller
{
    //

    public function resume(Request $request)
    {
        $fields_member = Validator::make($request->all(), [
            'fullname' => 'required|string|between:2,100',
            'phone' => 'required',
            'birthday' => 'required',
            'gender' => 'required',
            'marital' => 'required',
            'nationality' => 'required',
            'ctid' => 'required',
            'address' => 'required',
            ]);

        $fields_resume = Validator::make($request->all(), [
            // 'current_position' => 'required',
            'resume_title' => 'required',
            // 'current_company'  => 'required',
            'yearofexperience' => 'required',
            'current_level_id'  => 'required',
            'level_id'  => 'required',
            'industries'  => 'required',
            'locations'  => 'required',
            'salary_unit'  => 'required',
            'current_degree_id'  => 'required',
            'working_type'  => 'required',
            'languages'  => 'required',
            'summary'  => 'required',
            'rexp_title'  => 'required',
            'rexp_company'  => 'required',
            'rexp_date_start'  => 'required',
            // 'rexp_date_end'  => 'required',
            // 'rexp_current_end'  => 'required',
            'rexp_description'  => 'required',
            'edu_school'  => 'required',
            'edu_certify'  => 'required',
            'edu_date_start'  => 'required',
            // 'edu_date_end'  => 'required',
            // 'edu_current_end'  => 'required',
            'edu_description'  => 'required',
            'resume_file'  => 'required',
        ]);

        if ($fields_member->fails()) {
            return response()->json($fields_employer->errors(), 422);
        }
        if ($fields_resume->fails()) {
            return response()->json($fields_company->errors(), 422);
        }

        $member = Member::create(array_merge(
            $fields_employer->validated()
        ));

        // $resume = $member->resume();
        $resume = Resume::($data_comp = array_merge(
            $fields_resume->validated()
        ));

        if($member && $resume){
            $resume->member_id = $member->id;
            $resume->save();
            return response()->json([
                'member' => $member,
                'resume' => $resume,
            ]);
        }

        return response()->json([
            'message' => 'ĐI'
        ]);
    }


}