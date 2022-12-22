<?php

namespace App\Http\Controllers\admin;
use App\Http\Controllers\Controller;
use App\Models\Candidate;
use App\Models\Job;
use App\Models\Member;
use App\Models\Resume;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator,Carbon\Carbon,DB;
class DashboardController extends Controller
{
    //
    public function index()
    {
        //
        $totalJobsActive = Job::whereDate('end_date', '>', Carbon::now())->where('status', Job::STATUS_PUBLISHED)->count();
        $totalJobsPending = Job::where('status', Job::STATUS_PENDING)->count();
        $totalMembers = Member::count();
        $totalResumes = Resume::count();
        $totalCandidates = Candidate::count();

        $candidate_apply = Candidate::first();
        if($candidate_apply){
            $candidate_apply_by_month = Candidate::select(DB::raw("COUNT(*) as count"))
                            ->whereYear('date_apply', date('Y'))
                            ->groupBy(DB::raw("Month(date_apply)"))
                            ->pluck('count');
            $months =  Candidate::select(DB::raw("Month(date_apply) as month"))
                            ->whereYear('date_apply', date('Y'))
                            ->groupBy(DB::raw("Month(date_apply)"))
                            ->pluck('month');
            $data = [0,0,0,0,0,0,0,0,0,0,0,0];
            foreach ($months as $index => $month){
                --$month;
                $data[$month] = $candidate_apply_by_month[$index];
            }
        }
        if(empty($data)) $data = [0,0,0,0,0,0,0,0,0,0,0,0];
        return response()->json([
            'totalJobsActive' => $totalJobsActive,
            'totalJobsPending' => $totalJobsPending,
            'totalMembers' => $totalMembers,
            'totalResumes' => $totalResumes,
            'totalCandidates' => $totalCandidates,
            'candidate_apply_by_month' => $data,
        ]);
    }
}
