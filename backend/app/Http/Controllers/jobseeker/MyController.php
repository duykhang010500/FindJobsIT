<?php

namespace App\Http\Controllers\jobseeker;
use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\Candidate;
use App\Models\Company;
use App\Models\Resume;
use App\Models\JobSave;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator;
class MyController extends Controller
{
    //
    public function getResume(Request $request)
    {
        $id = auth()->user()->resume->id;
        $resume = Resume::with('locations','industries','member')->where('id',$id)->first();

        return response()->json([
            'resume' => $resume,
        ]);
    }

    public function resume(Request $request)
    {
        try{
            $fields_member = Validator::make($request->all(), [
                'fullname' => 'required|string|between:2,100',
                'phone' => 'required',
                'avatar' => 'string',
                'birthday' => 'required',
                'gender' => 'required',
                'marital' => 'required',
                'nationality' => 'required',
                'city' => 'required',
                'address' => 'required',
                ]);

            $fields_resume = Validator::make($request->all(), [
                // 'current_position' => 'required',
                'resume_title' => 'required',
                // 'current_company'  => 'required',
                'yearofexperience' => 'required',
                'current_level'  => 'required',
                'level'  => 'required',
                'industries'  => 'required',
                'locations'  => 'required',
                'salary_unit'  => 'required',
                // 'current_degree'  => 'required',
                'working_type'  => 'required',
                // 'languages'  => 'required',
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
                return response()->json($fields_member->errors(), 422);
            }

            $member = Member::findOrFail(auth()->user()->id);
            $member->update($fields_member->validated());
            if ($fields_resume->fails()) {
                return response()->json($fields_resume->errors(), 422);
            }

            $resume = auth()->user()->resume;

            if($resume != NULL){
                if(!empty($request->industries)){
                    $resume->industries()->detach();
                    $data = explode(',', $request->industries);
                    foreach ($data as $key => $value) {
                        $value = (int)$value;
                        $resume->industries()->attach($value);
                        $resume->save();
                    }
                }
                if(!empty($request->locations)){
                    $resume->locations()->detach();
                    $data = explode(',', $request->locations);
                    foreach ($data as $key => $value) {
                        $value = (int)$value;
                        $resume->locations()->attach($value);
                        $resume->save();
                    }
                }
                $resume->update(array_merge($fields_resume->validated(),
                    ['current_position' => $request->current_position,'current_company' => $request->current_company,
                    'languages' => $request->languages,'rexp_date_end' => $request->rexp_date_end,
                    'rexp_current_end' => $request->rexp_current_end,'edu_date_end' => $request->edu_date_end,
                    'edu_current_end' => $request->edu_current_end,'degree' => $request->degree,
                    'salary_from' => $request->salary_from,'salary_to' => $request->salary_to,
                    ]
                ));
            }else{
                $resume = Resume::create(array_merge($fields_resume->validated(),
                    ['current_position' => $request->current_position,'current_company' => $request->current_company,
                    'languages' => $request->languages,'rexp_date_end' => $request->rexp_date_end,
                    'rexp_current_end' => $request->rexp_current_end,'edu_date_end' => $request->edu_date_end,
                    'edu_current_end' => $request->edu_current_end,'degree' => $request->degree,
                    'salary_from' => $request->salary_from,'salary_to' => $request->salary_to,
                    ]
                ));
                $member->resume_id = $resume->id;
                $member->save();

                if(!empty($request->industries)){
                    $data = explode(',', $request->industries);
                    foreach ($data as $key => $value) {
                        $value = (int)$value;
                        $resume->industries()->attach($value);
                        $resume->save();
                    }
                }
                if(!empty($request->locations)){
                    $data = explode(',', $request->locations);
                    foreach ($data as $key => $value) {
                        $value = (int)$value;
                        $resume->locations()->attach($value);
                        $resume->save();
                    }
                }
            }

            if($member && $resume){
                return response()->json([
                    'member' => $member,
                    'resume' => $resume,
                ]);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function historyApply(){
        $id = auth()->user()->id;
        $history = Candidate::with('job','member','company')->where('member_id',$id)->get();
        if(!empty($history)){
            return response()->json([
                'history' => $history,
            ]);
        }
        return response()->json([
            'message' => auth()->user()->id
        ]);

    }

    public function jobSaves()
    {
        //
        $wishlists = JobSave::with('member','job')->where("member_id", "=", auth()->user()->id)->orderby('id', 'desc')->paginate(10);
        return ($wishlists);
    }

    public function saved(Request $request){

        $fields = Validator::make($request->all(), [
          'job_id' =>'required',
          ]);

        if ($fields->fails()) {
            return response()->json($fields->errors(), 422);
        }

        $status=JobSave::where('member_id',auth()->user()->id)
                          ->where('job_id',$request->job_id)
          ->first();

        if(isset($status->member_id) and isset($request->job_id))
        {
            return response([
                'message' => 'This item is already in your wishlist!',
            ], 400);
        }
        else
        {
        $wishlist = new JobSave();
        $wishlist->member_id = auth()->user()->id;
        $wishlist->job_id = $request->job_id;
        $wishlist->save();

        return response([
            'message' => 'Added to your wishlist.',
            'data' => ($wishlist)
        ], 201);
        }

    }

    public function remove_on_wishlist(Request $request,$id)
    {
        //
        $wishlist = JobSave::where('member_id',auth()->user()->id)->where('job_id',$id)->first();
        if($wishlist){
            $wishlist->destroy($wishlist->id);
            return response([
                'message' => 'Delete job on wishlist'
            ], 200);
        }else{
            return response([
                'message' => 'This job does not exist in wishlist'
            ], 400);
        }
    }

}