<?php

namespace App\Http\Controllers\jobseeker;
use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\Candidate;
use App\Models\Company;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Resume;
use App\Models\JobSave;
use App\Models\MemberFollow;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator;
class MyController extends Controller
{
    //
    public function getResume(Request $request)
    {
        if(!empty(auth()->user()->resume->id)){
            $resume = Resume::with('locations','industries','member','educations','experiences')->where('id',auth()->user()->resume->id)->first();
            return response()->json([
                'resume' => $resume,
            ]);
        }
        return response()->json([
            'message' => 'Resume not exist',
        ],400);
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
                // 'rexp_title'  => 'required',
                // 'rexp_company'  => 'required',
                // 'rexp_date_start'  => 'required',
                // 'rexp_date_end'  => 'required',
                // 'rexp_current_end'  => 'required',
                // 'rexp_description'  => 'required',
                // 'edu_school'  => 'required',
                // 'edu_certify'  => 'required',
                // 'edu_date_start'  => 'required',
                // 'edu_date_end'  => 'required',
                // 'edu_current_end'  => 'required',
                // 'edu_description'  => 'required',
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
            if(!empty($request->skills) && !empty($request->skills_level)){

                $skills = explode(',', $request->skills);
                $skills_level = explode(',', $request->skills_level);
                foreach ($skills as $key => $skill) {
                        $arr_skill[] = [
                            'name' => $skill,
                            'skills_level' => $skills_level[$key]
                        ];
                }
            }

            // $data =  $request->json()->all();

            // dd($arr_skill);
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

                if($request['educations'] && $request['educations'][0]){   // educations
                    $resume->educations()->delete();
                    foreach($request['educations'] as $key => $education){
                        $edu = new Education;
                        $edu->edu_school = $education['edu_school'];
                        $edu->edu_certify = $education['edu_certify'];
                        $edu->edu_date_start = $education['edu_date_start'];
                        $edu->edu_date_end = $education['edu_date_end'];
                        $edu->edu_current_end = $education['edu_current_end'];
                        $edu->edu_description = $education['edu_description'];
                        $edu->resume_id = $resume->id;
                        $edu->save();
                    }
                }else{
                    return response([
                        'status' => 400,
                        'message' => 'Education required'
                    ], 400);
                }

                if($request['experiences'] && $request['experiences'][0]){   // educations
                    $resume->experiences()->delete();
                    foreach($request['experiences'] as $key => $experience){
                        $exp = new Experience;
                        $exp->rexp_title = $experience['rexp_title'];
                        $exp->rexp_company = $experience['rexp_company'];
                        $exp->rexp_date_start = $experience['rexp_date_start'];
                        $exp->rexp_date_end = $experience['rexp_date_end'];
                        $exp->rexp_current_end = $experience['rexp_current_end'];
                        $exp->rexp_description = $experience['rexp_description'];
                        $exp->resume_id = $resume->id;
                        $exp->save();
                    }
                }else{
                    return response([
                        'status' => 400,
                        'message' => 'Experience required'
                    ], 400);
                }

                $resume->update(array_merge($fields_resume->validated(),
                    ['current_position' => $request->current_position,'current_company' => $request->current_company,
                    'languages' => $request->languages,'rexp_date_end' => $request->rexp_date_end,
                    'rexp_current_end' => $request->rexp_current_end,'degree' => $request->degree,'resume_status' => $request->resume_status,
                    'salary_from' => $request->salary_from,'salary_to' => $request->salary_to,'cv_type' => $request->cv_type, 'skills' => $arr_skill,
                    ]
                ));
            }else{
                $resume = Resume::create(array_merge($fields_resume->validated(),
                    ['current_position' => $request->current_position,'current_company' => $request->current_company,
                    'languages' => $request->languages,'rexp_date_end' => $request->rexp_date_end,
                    'rexp_current_end' => $request->rexp_current_end,'degree' => $request->degree,'resume_status' => $request->resume_status,
                    'salary_from' => $request->salary_from,'salary_to' => $request->salary_to,'cv_type' => $request->cv_type, 'skills' => $arr_skill,
                    ]
                ));

                if($request['educations'] && $request['educations'][0]){   // educations
                    foreach($request['educations'] as $key => $education){
                        $edu = new Education;
                        if($education['edu_school']) $edu->edu_school = $education['edu_school'];
                        if($education['edu_certify']) $edu->edu_certify = $education['edu_certify'];
                        if($education['edu_date_start']) $edu->edu_date_start = $education['edu_date_start'];
                        if($education['edu_date_end']) $edu->edu_date_end = $education['edu_date_end'];
                        if($education['edu_current_end']) $edu->edu_current_end = $education['edu_current_end'];
                        if($education['edu_description']) $edu->edu_description = $education['edu_description'];
                        $edu->resume_id = $resume->id;
                        $edu->save();
                    }
                }else{
                    return response([
                        'status' => 400,
                        'message' => 'Education required'
                    ], 400);
                }

                if($request['experiences'] && $request['experiences'][0]){   // educations
                    foreach($request['experiences'] as $key => $experience){
                        $exp = new Experience;
                        $exp->rexp_title = $experience['rexp_title'];
                        $exp->rexp_company = $experience['rexp_company'];
                        $exp->rexp_date_start = $experience['rexp_date_start'];
                        $exp->rexp_date_end = $experience['rexp_date_end'];
                        $exp->rexp_current_end = $experience['rexp_current_end'];
                        $exp->rexp_description = $experience['rexp_description'];
                        $exp->resume_id = $resume->id;
                        $exp->save();
                    }
                }else{
                    return response([
                        'status' => 400,
                        'message' => 'Experience required'
                    ], 400);
                }

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
            'message' => 'None apply'
        ]);

    }

    public function applyDetail(Request $request,$id){
        $history = Candidate::with(['job','member','company','resume','resume.industries','resume.locations'])->where('member_id',auth()->user()->id)->where('id',$id)->get();
        if(!empty($history)){
            return response()->json([
                'history' => $history,
            ]);
        }
        return response()->json([
            'message' => 'None apply'
        ]);

    }

    public function jobSaves()
    {
        //
        $wishlists = JobSave::with(['job','job.company'])->where("member_id", "=", auth()->user()->id)->orderby('id', 'desc')->get();
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

    public function updateCVType(Request $request){
        try{
            $resume = auth() -> user() -> resume;
            $resume -> update(['cv_type' => $request -> cv_type]);
              return response()->json([
                    'message' => 'Update successfully!'
                ]);
        }catch(\Throwable $th){
            return response()->json([
                'message' => 'Occur error!'
            ], 500);
        }
    }

    public function followCompanyList(Request $request)
    {
        //
        $wishlists = MemberFollow::with(['company'])->where('member_id',auth()->user()->id)->get();
        return ($wishlists);
    }

    public function companySaved(Request $request){

        $fields = Validator::make($request->all(), [
          'comp_id' =>'required',
          ]);

        if ($fields->fails()) {
            return response()->json($fields->errors(), 422);
        }

        $status=MemberFollow::where('member_id',auth()->user()->id)
                          ->where('comp_id',$request->comp_id)
          ->first();

        if(isset($status->member_id) and isset($request->comp_id))
        {
            return response([
                'message' => 'This company is already in your following!',
            ], 400);
        }
        else
        {
        $wishlist = new MemberFollow();
        $wishlist->member_id = auth()->user()->id;
        $wishlist->comp_id = $request->comp_id;
        $wishlist->save();

        return response([
            'message' => 'Added company to your following.',
            'data' => ($wishlist)
        ], 201);
        }

    }

    public function remove_on_following_company(Request $request,$comp_id)
    {
        //
        $wishlist = MemberFollow::where('member_id',auth()->user()->id)->where('comp_id',$comp_id)->first();
        if($wishlist){
            $wishlist->destroy($wishlist->id);
            return response([
                'message' => 'Remove company on following'
            ], 200);
        }else{
            return response([
                'message' => 'This company does not exist in following'
            ], 400);
        }
    }

}