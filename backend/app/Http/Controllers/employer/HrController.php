<?php

namespace App\Http\Controllers\employer;
use App\Http\Controllers\Controller;
use App\Models\Employer;
use App\Models\Company;
use App\Models\Job;
use App\Models\Member;
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

    public function getJob(Request $request)
    {
        $jobs = Job::with('industries','locations','company')->where('comp_id',auth()->user()->company->id)->get();
        return response()->json([
            'job' => $jobs,
        ]);
    }
    public function job(Request $request)
    {

        // dd(auth()->user()->company->id);
        $validator = Validator::make($request->all(), [
            'title' => 'required|unique:jobs,title',
            'job_type' => 'required',
            'level' => 'required',
            'industries' => 'required',
            'degree' => 'required',
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
            ['comp_id' => auth()->user()->company->id,'status' => $request->status,
            'exp' => $request->exp,
            'exp_from' => $request->exp_from,'exp_to' => $request->exp_to,'salary' => $request->salary,
            'salary_from' => $request->salary_from,'exp_to' => $request->exp_to,'salary' => $request->salary,
            'salary_from' => $request->salary_from,'salary_to' => $request->salary_to,'gender' => $request->gender,
            'age_from' => $request->age_from,'age_to' => $request->age_to,'unskill_job' => $request->unskill_job,
            'job_benefits' => $request->job_benefits,'end_date' => $request->end_date,'contact_emails' => $request->contact_emails,
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

    public function updateJob(Request $request,$id)
    {
        $job = Job::where('id',$id)->first();
        $validator = Validator::make($request->all(), [
            'title' => 'required|unique:jobs,title,'.$id,
            'job_type' => 'required',
            'level' => 'required',
            'industries' => 'required',
            'degree' => 'required',
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

        if(!empty($request->industries)){
            $job->industries()->detach();
            $data = explode(',', $request->industries);
            foreach ($data as $key => $value) {
                $value = (int)$value;
                $job->industries()->attach($value);
                $job->save();
            }
        }

        if(!empty($request->locations)){
            $job->locations()->detach();
            $data = explode(',', $request->locations);
            foreach ($data as $key => $value) {
                $value = (int)$value;
                $job->locations()->attach($value);
                $job->save();
            }
        }
        $job->update(array_merge($validator->validated(),
        [   'comp_id' => auth()->user()->company->id,'status' => $request->status,
            'exp' => $request->exp,
            'exp_from' => $request->exp_from,'exp_to' => $request->exp_to,'salary' => $request->salary,
            'salary_from' => $request->salary_from,'exp_to' => $request->exp_to,'salary' => $request->salary,
            'salary_from' => $request->salary_from,'salary_to' => $request->salary_to,'gender' => $request->gender,
            'age_from' => $request->age_from,'age_to' => $request->age_to,'unskill_job' => $request->unskill_job,
            'job_benefits' => $request->job_benefits,'end_date' => $request->end_date,'contact_emails' => $request->contact_emails,
        ]));

        return response()->json([
            'job' => $job,
        ]);
    }

    public function candidates(Request $request){

        $item = Candidate::with('job','member')->where([
            ['comp_id', '=', auth()->user()->company->id],
            // ['job_id', '=', $job -> id],
        ])->get();
        return response()->json([
            'candidate' => $item
        ]);

    }

    public function candidate(Request $request,$id){

        $candidate = Candidate::find($id);
        return response()->json([
            'candidate' => Member::with('resume')->where('id',$candidate->member_id)->first()
        ]);

    }

    public function candidateStatus(Request $request,$id){
        $candidate = Candidate::where('id', $id)->firstOrFail();
        // $candidate->update(['status', $request->status]);
        $request->validate([
            'status' => 'required',
        ]);

        $candidate->update($request->all());
        return response()->json([
            'candidate' => $candidate,
            'message' => 'update candidate status'
        ]);

    }

    public function getCompany(Request $request){
        $id = auth()->user()->company->id;
        $company = Company::where('id',$id)->first();
        return response()->json([
            'company' => $company
        ]);
    }
    public function company(Request $request){
        $id = auth()->user()->company->id;
        $model = Company::findOrFail($id);

        $fields_company = Validator::make($request->all(), [
            'name' => 'required|string|unique:companies,name,'.$id,
            'company_size' => 'required',
            'industry_id' => 'required',
            ]);
        if ($fields_company->fails()) {
            return response()->json($fields_company->errors(), 422);
        }
        $model->update(array_merge($fields_company->validated(),
        ['address' => $request->address,'tax' => $request->tax,
         'address' => $request->address,
         'phone' => $request->phone,'company_size' => $request->company_size,
         'fax' => $request->fax,'website' => $request->website,
         'email' => $request->email,'location_id' => $request->location_id,
         'content' => $request->content,'logo' => $request->logo,
         'banners' => $request->banners,'keywords' => $request->keywords,
        ]
    ));
        return response()->json([
            'company' => $model,
            'message' => 'Update company successfully'
        ]);

    }

    public function getProfile(Request $request){
        return response()->json([
            'profile' => Employer::with('company')->where('id',auth()->user()->id)->get()
        ]);
    }

    public function profile(Request $request){
        $model = Employer::find(auth()->user()->id);
        $fields = Validator::make($request->all(), [
            'fullname' => 'required|string',
            'password' => 'confirmed',
            'avatar'    => 'string',

            ]);
        if ($fields->fails()) {
            return response()->json($fields->errors(), 422);
        }
        $model->update(array_merge($fields->validated(),['password' => bcrypt($request->password)]));
        return response()->json([
            'profile' => $model,
            'message' => 'Update profile successfully'
        ]);

    }


}