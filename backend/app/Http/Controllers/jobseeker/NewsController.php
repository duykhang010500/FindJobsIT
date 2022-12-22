<?php

namespace App\Http\Controllers\jobseeker;
use App\Http\Controllers\Controller;
use App\Models\News;
use App\Models\Resume;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Pagination\LengthAwarePaginator;
use Validator;
class JobController extends Controller
{
    //
    public function index(Request $request)
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
                'tags' => NULL,
                'job_type' => $request->get('job_type'),
                'level_id' => $request->get('level_id'),
                'salary' => $request->get('salary'),
                'salary_from' => $request->get('salary_from'),
                'salary_to' => $request->get('salary_to'),
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

            $result = Job::query();

            if (!empty($params['keywords'])) {
                $result = $result->where('title', 'like', '%'.$params['keywords'].'%');
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
            if (!empty($params['job_type'])) {
                $result = $result->where('job_type', $params['job_type']);
            }
            if (!empty($params['salary'])) {
                $result = $result->where('salary', $params['salary']);
            }
            if (!empty($params['level_id'])) {
                $result = $result->where('level_id', $params['level_id']);
            }
            if (!empty($params['salary_from']) && !empty($params['salary_to'])) {
                $minFilter = $params['salary_from'];
                $maxFilter = $params['salary_to'];
                $result->where(function($query) use ($minFilter,$maxFilter) {
                    $query->where('salary_to', '>' , $minFilter);
                    $query->where('salary_from', '<',  $maxFilter);
                });
            }
            // dd($params);
            $result = $result->with('company','industries','locations')->orderBy('id','desc')->get();

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
}
