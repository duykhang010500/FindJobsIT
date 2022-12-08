<?php

namespace App\Http\Controllers\employer;
use App\Http\Controllers\Controller;
use App\Models\Employer;
use App\Models\EmployerFolder;
use App\Models\Company;
use App\Models\Office;
use App\Models\Job;
use App\Models\Member;
use App\Models\Candidate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator,Carbon\Carbon,DB;
class HrController extends Controller
{

    //
    public function dashboard()
    {
        //
        $totalJobsActive = Job::whereDate('end_date', '>', Carbon::now())->where('status', Job::STATUS_PUBLISHED)->where('comp_id',auth()->user()->company->id)->count();
        $totalJobsExpired = Job::whereDate('end_date', '<', Carbon::now())->where('status', Job::STATUS_PUBLISHED)->where('comp_id',auth()->user()->company->id)->count();
        $totalJobsPending = Job::where('status', Job::STATUS_PENDING)->where('comp_id',auth()->user()->company->id)->count();
        $totalJobsStopPosting = Job::whereDate('end_date', '>', Carbon::now())->where('status', Job::STATUS_CLOSED)->where('comp_id',auth()->user()->company->id)->count();
        $totalCandidates = Candidate::where('comp_id',auth()->user()->company->id)->count();

        $candidate_apply = Candidate::where('comp_id',auth()->user()->company->id)->first();
        if($candidate_apply){
            $candidate_apply_by_month = Candidate::select(DB::raw("COUNT(*) as count"))
                            ->whereYear('updated_at', date('Y'))
                            ->groupBy(DB::raw("Month(updated_at)"))
                            ->pluck('count');
            $months =  Candidate::select(DB::raw("Month(updated_at) as month"))
                            ->whereYear('updated_at', date('Y'))
                            ->groupBy(DB::raw("Month(updated_at)"))
                            ->pluck('month');
            $data = [0,0,0,0,0,0,0,0,0,0,0,0];
            foreach ($months as $index => $month){
                --$month;
                $data[$month] = $candidate_apply_by_month[$index];
            }
        }
        if(!$data) $data = [0,0,0,0,0,0,0,0,0,0,0,0];
        return response()->json([
            'totalJobsActive' => $totalJobsActive,
            'totalJobsPending' => $totalJobsPending,
            'totalJobsStopPosting' => $totalJobsStopPosting,
            'totalJobsExpired' => $totalJobsExpired,
            'totalCandidates' => $totalCandidates,
            'candidate_apply_by_month' => $data,
        ]);
    }

    public function getJob(Request $request)
    {
        $jobs = Job::with('industries','locations','company')->where('comp_id',auth()->user()->company->id)->get();
        return response()->json([
            'job' => $jobs,
        ]);
    }

    public function detail(Request $request, $id)
    {
        $job = Job::with(['industries','locations','company','candidate','candidate.resume'])->where('comp_id',auth()->user()->company->id)->where('id', $id)->first();
        return response()->json([
            'job' => $job,
        ]);
    }

    public function get_candidate_by_job(Request $request, $id)
    {
        $candidate_by_job = Candidate::with(['job','resume','company','member','job.industries','job.locations'])->where('comp_id',auth()->user()->company->id)->where('job_id', $id)->get();
        return response()->json([
            'candidate_by_job' => $candidate_by_job,
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
            ['comp_id' => auth()->user()->company->id,'status' => $request -> status,
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
            'message' => 'Your job is waiting for admin approval'
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
            'status' => $request->status
        ]));

        return response()->json([
            'job' => $job,
        ]);
    }

    public function updateJobStatus(Request $request, $id){
        try{
            Job::find($id) -> update(['status' => $request -> status]);
            return response()->json(['message' => 'Update status successfully!']);
        }catch(\Throwable $th){
            return response()->json([
                'message' => 'Occur error!',

            ], 500);
        }
    }

    public function deleteJob(Request $request,$id){
        $job = Job::where('id',$id)->first();
        $job->industries()->detach();
        $job->locations()->detach();
        $result = $job->destroy($id);
        if($result){
            return response([
                'message' => 'Delete product successfully'
            ]);
        }
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
        return response()->json([
            'candidate' => Candidate::with(['resume','job','company','member','resume.industries','resume.locations','resume.educations','resume.experiences'])->where('id',$id)->first()
        ]);

    }

    public function candidateStatus(Request $request,$id){
        $candidate = Candidate::where('id', $id)->firstOrFail();
        // $candidate = Candidate::find($id);
        $candidate->update(['status', $request->status]);
        // $request->validate([
        //     'status' => 'required',
        // ]);
        $candidate->update($request->all());
        // $candidate->status = $request->status;
        // $candidate->timestamps = false;
        // $candidate->updated_at = now();
        // $candidate->touch();
        return response()->json([
            'candidate' => $candidate,
            'message' => 'update candidate status'
        ]);

    }

    public function getCompany(Request $request){
        $company = Company::where('id',auth()->user()->company->id)->first();
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
            'industry_name' => 'required',
            'location_name' => 'required',
            ]);
        if ($fields_company->fails()) {
            return response()->json($fields_company->errors(), 422);
        }
        $model->update(array_merge($fields_company->validated(),
        ['address' => $request->address,'tax' => $request->tax,
         'phone' => $request->phone,'company_size' => $request->company_size,
         'fax' => $request->fax,'website' => $request->website,
         'email' => $request->email,
         'content' => $request->content,'logo' => $request->logo,
         'banners' => $request->banners,'keywords' => $request->keywords,
         'images' => $request->images
        ]
    ));
        return response()->json([
            'company' => $model,
            'message' => 'Update company successfully'
        ]);

    }

    public function offices(Request $request){
        return response()->json([
            'offices' => Office::with('company')->where('comp_id',auth()->user()->company->id)->orderBy('priority','desc')->get()
        ]);
    }

    public function office(Request $request, $id){
        $model = Office::with('company')->where('id',$id)->where('comp_id',auth()->user()->company->id)->first();

        if ($request->isMethod('get')) {
            return response()->json([
                'office' => $model
            ]);
        };
        if ($request->isMethod('delete')) {
            if($model != null){
                $model->delete();
                $message = 'Office deleted successfully';
            }else{
                $message = 'Office not exist';
            }
            return response()->json([
                'message' => $message
            ]);
        };
        if ($request->isMethod('post') || $request->isMethod('patch')) {
            $fields = Validator::make($request->all(), [
                'name' => 'required|string|between:2,100',
                'phone' => 'required',
                'priority' => 'required',
                'address' => 'required',
            ]);
        };
        if ($fields->fails()) {
            return response()->json($fields->errors(), 422);
        }
        ($model != null) ? $model->update(array_merge($fields->validated()))
                         : $model = Office::create(array_merge($fields->validated(),
                            ['comp_id' => auth()->user()->company->id]));

        return response()->json([
            'message' => 'Update successfully.',
            'office' => $model
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
        if($request->password){
            $model->update(array_merge($fields->validated(),['password' => Hash::make($request->password)]));
        }else{
            $model->update(array_merge($fields->validated()));
        }
        return response()->json([
            'profile' => $model,
            'message' => 'Update profile successfully'
        ]);

    }

    public function actionFolders(Request $request){
        return response()->json([
            'folders' => EmployerFolder::where('comp_id',auth()->user()->company->id)->orderBy('id','desc')->get()
        ]);
    }

    public function actionFolder(Request $request,$id){
        $model = EmployerFolder::with(['EmployerSaved','EmployerSaved.resume'])->where('id',$id)->where('comp_id',auth()->user()->company->id)->first();
        if ($request->isMethod('get')) {
            return response()->json([
                'folder' => $model
            ]);
        };
        if ($request->isMethod('delete')) {
            if($model != null){
                $model->delete();
                $message = 'Folder deleted successfully';
            }else{
                $message = 'Folder not exist';
            }
            return response()->json([
                'message' => $message
            ]);
        };
        if ($request->isMethod('post')) {
            $fields = Validator::make($request->all(), [
                'name' =>'required|string|unique:employer_folders',
            ]);
        };
        if($request->isMethod('patch')) {
            $fields = Validator::make($request->all(), [
                'name' =>'required|string|unique:employer_folders,name,'.$id,
            ]);
        };
        if ($fields->fails()) {
            return response()->json($fields->errors(), 422);
        }
        ($model != null) ? $model->update(array_merge($fields->validated(),['is_private' => $request->is_private]))
                         : $model = EmployerFolder::create(array_merge($fields->validated(),
                            ['is_private' => $request->is_private,'comp_id' => auth()->user()->company->id,'emp_id' => auth()->user()->id]));

        return response()->json([
            'folder' => $model,
        ]);

    }


}