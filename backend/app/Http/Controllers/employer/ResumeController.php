<?php

namespace App\Http\Controllers\employer;
use App\Http\Controllers\Controller;
use App\Models\Employer;
use App\Models\Resume;
use App\Models\Member;
use App\Models\EmployerSaved;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator;
use Carbon\Carbon;
use Illuminate\Pagination\LengthAwarePaginator;
class ResumeController extends Controller
{
    //
    public function search(Request $request)
    {
        //
        try {
            $params = [
                'id' => NULL,
                'uid' => null,
                'comp_id' => null,
                'keywords' => $request->get('keywords'),
                'locations' => $request->get('locations'),
                'industries' => $request->get('industries'),
                'resume_update' => $request->get('resume_update'),
                'language' => $request->get('language'),
                'degree' => $request->get('degree'),
                'level' => $request->get('level'),
                'nationality' => $request->get('nationality'),
                'salary_unit' => $request->get('salary_unit'),
                'salary_from' => $request->get('salary_from'),
                'salary_to' => $request->get('salary_to'),
                'exp_from' => $request->get('exp_from'),
                'exp_to' => $request->get('exp_to'),
                'age_from' => $request->get('age_from'),
                'age_to' => $request->get('age_to'),
                'active' => NULL,
                'expire' => NULL,
                'exclude' => NULL,
                'status' => NULL,
                'sort' => NULL,
                'boost_ids' => NULL,
                'type_date' => NULL,
                'from_date' => NULL,
                'to_date' => NULL,
                'days' => NULL,
                'is_hot' => NULL,
                'unskill_job' => NULL,
                'is_urgent' => NULL,
            ];

            $result = Resume::query();
            $result->with('member','industries','locations');
            if (!empty($params['keywords'])) {
                $result = $result->where('resume_title', 'like', '%'.$params['keywords'].'%');
            }

            if (!empty($params['locations'])) {

                $locs = is_array($params['locations']) ? $params['locations'] : explode(',', $params['locations']);
                $ids = array_map(function ($value) {
                    return (int) $value;
                }, $locs);

                $result = $result->whereHas('locations', function($query) use ($ids) {
                    $query->whereIn('location_id', $ids); // But this does
                });

            }

            if (!empty($params['industries'])) {
                $locs = is_array($params['industries']) ? $params['industries'] : explode(',', $params['industries']);
                $ids = array_map(function ($value) {
                    return (int) $value;
                }, $locs);

                $result = $result->whereHas('industries', function($query) use ($ids) {
                    $query->whereIn('industry_id', $ids); // But this does
                });
            }

            if (!empty($params['level'])) {
                $result = $result->where('level', 'like', '%'.$params['level'].'%');
            }
            if (!empty($params['degree'])) {
                $result = $result->where('degree', 'like', '%'.$params['degree'].'%');
            }
            if (!empty($params['language'])) {
                $result = $result->where('languages', 'like', '%'.$params['language'].'%');
            }
            if (!empty($params['nationality'])) {
                $nationality= $params['nationality'];
                $result->where(function($query) use ($nationality) {
                    $query->whereHas('member',fn($query2) =>
                            $query2->where('nationality','LIKE','%'.$nationality.'%'));
                });
            }
            if (!empty($params['resume_update'])) {
                switch ($params['resume_update']) {
                    case "today":
                        $result = $result->whereDate('updated_at', Carbon::today());
                        break;
                    case "3days":
                        $result = $result->whereDate('updated_at', '>=', Carbon::now()->subDays(3));
                        break;
                    case "7days":
                        $result = $result->whereDate('updated_at', '>=', Carbon::now()->subDays(7));
                        break;
                    case "14days":
                        $result = $result->whereDate('updated_at', '>=', Carbon::now()->subDays(14));
                        break;
                    case "1month":
                        $result = $result->whereDate('updated_at', '>=', Carbon::now()->subMonths(1));
                        break;
                    case "3months":
                        $result = $result->whereDate('updated_at', '>=', Carbon::now()->subMonths(3));
                        break;
                    case "6months":
                        $result = $result->whereDate('updated_at', '>=', Carbon::now()->subMonths(6));
                        break;
                    case "1year":
                        $result = $result->whereDate('updated_at', '>=', Carbon::now()->subMonths(12));
                        break;
                }
            }
            if (!empty($params['salary_unit'])) {
                $result = $result->where('salary_unit', 'like', '%'.$params['salary_unit'].'%');
            }

            if (!empty($params['job_type'])) {
                $result = $result->where('job_type', $params['job_type']);
            }
            if (!empty($params['salary'])) {
                $result = $result->where('salary', $params['salary']);
            }
            if (!empty($params['salary_from']) && empty($params['salary_to'])) {
                $result = $result->where('salary_to', '>=', $params['salary_from']);
            }
            if (!empty($params['salary_to']) && empty($params['salary_from'])) {
                $result = $result->where('salary_from', '<=' , $params['salary_to']);
            }

            if (!empty($params['salary_from']) && !empty($params['salary_to'])) {
                $minFilter = $params['salary_from'];
                $maxFilter = $params['salary_to'];
                $result->where(function($query) use ($minFilter,$maxFilter) {
                    $query->where('salary_to', '>=' , $minFilter);
                    $query->where('salary_from', '<=',  $maxFilter);
                });
            }
            if (!empty($params['exp_from']) && empty($params['exp_to'])) {
                $result = $result->where('yearofexperience', '>=', $params['exp_from']);
            }
            if (!empty($params['exp_to']) && empty($params['exp_from'])) {
                $result = $result->where('yearofexperience', '<=' , $params['exp_to']);
            }

            if (!empty($params['exp_from']) && !empty($params['exp_to'])) {
                $minFilter = $params['exp_from'];
                $maxFilter = $params['exp_to'];
                $result->where(function($query) use ($minFilter,$maxFilter) {
                    $query->where('yearofexperience', '>=' , $minFilter);
                    $query->where('yearofexperience', '<=',  $maxFilter);
                });
            }
            if (!empty($params['age_from']) && empty($params['age_to'])) {
                $date = date("Y-m-d", strtotime(Carbon::now()->subYears($params['age_from'])));
                $result->where(function($query) use ($date) {
                    $query->whereHas('member',fn($query2) =>
                            // dd($date).
                            $query2->whereDate('birthday', '<=', $date));
                });
            }
            if (!empty($params['age_to']) && empty($params['age_from'])) {
                $date = date("Y-m-d", strtotime(Carbon::now()->subYears($params['age_to'])));
                $result->where(function($query) use ($date) {
                    $query->whereHas('member',fn($query2) =>
                            // dd($date).
                            $query2->whereDate('birthday', '>=', $date));
                });
            }
            if (!empty($params['age_from']) && !empty($params['age_to'])) {
                $minFilter = date("Y-m-d", strtotime(Carbon::now()->subYears($params['age_from'])));
                $maxFilter = date("Y-m-d", strtotime(Carbon::now()->subYears($params['age_to'])));
                $result->where(function($query) use ($minFilter,$maxFilter) {
                    $query->whereHas('member',fn($query2) =>
                            $query2->whereBetween('birthday', [$maxFilter, $minFilter]));
                });
            }
            // return response()->json([
            //     'result' => $result->get()
            // ]);
            // dd($params);
            $result = $result->where('resume_status', Resume::STATUS_PUBLISHED)->orderBy('id','desc')->get();

            $currentPage = LengthAwarePaginator::resolveCurrentPage();
            // Create a new Laravel collection from the array data
            $itemCollection = collect($result);
            // Define how many items we want to be visible in each page
            $perPage = 9;
            // Slice the collection to get the items to display in current page
            $currentPageItems = $itemCollection->slice(($currentPage * $perPage) - $perPage, $perPage)->values();
            // Create our paginator and pass it to the view
            $paginatedItems= new LengthAwarePaginator($currentPageItems , count($itemCollection), $perPage);
            // set url path for generted links
            $paginatedItems->setPath($request->url());
            return response()->json([
                'result' => $paginatedItems,
            ]);
        } catch (\Exception $e) {
            echo $e->getMessage();
            return NULL;
        }
    }

    public function detail($id)
    {
        //
        try{
            $resume = Resume::with('member','industries','locations')->where('id',$id)->first();
            return response()->json([
                'resume' => $resume
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ]);
        }
    }

    public function getResumeSaved()
    {
        //
        $wishlists = EmployerSaved::with('resume','company','EmployerFolders')->where("comp_id", "=", auth()->user()->company->id)->orderby('id', 'desc')->get();
        return response()->json([
            'wishlists' => $wishlists,
        ]);
    }

    public function saveResume(Request $request){
        $fields = Validator::make($request->all(), [
            'resume_id' =>'required',
            ]);

          if ($fields->fails()) {
              return response()->json($fields->errors(), 422);
          }
          $status=EmployerSaved::where('resume_id',$request->resume_id)
                            ->where('comp_id',auth()->user()->company->id)
            ->first();

          if(isset($status->resume_id) and isset(auth()->user()->company->id))
          {
              return response([
                  'message' => 'This resume is already in your wishlist!',
              ], 400);
          }
          else
          {
          $wishlist = new EmployerSaved();
          $wishlist->member_id = Resume::find($request->resume_id)->member->id;
          $wishlist->resume_id = $request->resume_id;
          $wishlist->comp_id = auth()->user()->company->id;
          $wishlist->emp_id = auth()->user()->id;
          if($request->employer_folder_id) $wishlist->employer_folder_id = $request->employer_folder_id;
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
        $wishlist = EmployerSaved::where('comp_id',auth()->user()->company->id)->where('resume_id',$id)->first();
        if($wishlist){
            $wishlist->destroy($wishlist->id);
            return response([
                'message' => 'Delete resume on wishlist'
            ], 200);
        }else{
            return response([
                'message' => 'This resume does not exist in wishlist'
            ], 400);
        }
    }
}