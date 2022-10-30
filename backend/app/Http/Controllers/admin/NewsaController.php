<?php

namespace App\Http\Controllers\admin;
use App\Http\Controllers\Controller;
use App\Models\News;
use App\Models\NewsCat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator;
class NewsaController extends Controller
{
    //

    public function index()
    {
        //
        $news = News::with('categories')->orderBy('id','desc')->get();
        return response()->json([
            'news' => $news,
        ]);
    }

    public function indexCat()
    {
        //
        $news = NewsCat::orderBy('id','desc')->get();
        return response()->json([
            'news' => $news,
        ]);
    }

    public function store(Request $request,$id)
    {
        //
        $model = News::where('id',$id)->first();

        if ($request->isMethod('post')) {
            $fields = Validator::make($request->all(), [
                'title' => 'required|string',
                'image' => 'required',
                'intro' => 'required',
                'content' => 'required',
                'status' => 'required',
            ]);
        }else{
            $fields = Validator::make($request->all(), [
                'title' => 'required|string',
                'image' => 'required',
                'intro' => 'required',
                'content' => 'required',
                'status' => 'required',
            ]);
        }

        if ($fields->fails()) {
            return response()->json($fields->errors(), 422);
        }

        ($model != null) ? $model->update(array_merge($fields->validated(),['catid' => $request->catid]))
                         : $model = News::create(array_merge($fields->validated(),['catid' => $request->catid]));

        return response()->json([
            'news' => $model,
        ]);

    }

    public function storeCat(Request $request,$id)
    {
        //
        $model = NewsCat::where('id',$id)->first();

        if ($request->isMethod('post')) {
            $fields = Validator::make($request->all(), [
                'name' => 'required|string',
                'status' => 'required',
                'priority' => 'required',
            ]);
        }else{
            $fields = Validator::make($request->all(), [
                'name' => 'required|string',
                'status' => 'required',
                'priority' => 'required',
            ]);
        }

        if ($fields->fails()) {
            return response()->json($fields->errors(), 422);
        }

        ($model != null) ? $model->update(array_merge($fields->validated()))
                         : $model = NewsCat::create(array_merge($fields->validated()));

        return response()->json([
            'news_cat' => $model,
        ]);

    }

    public function deleteCat(Request $request,$id)
    {
        //
        $model = NewsCat::where('id',$id)->delete();

        ($model != null) ? $message = 'NewsCat deleted successfully' : $message = 'NewsCat not exist';
        return response()->json([
            'message' => $message
        ]);

    }

    public function delete(Request $request,$id)
    {
        //
        $model = News::where('id',$id)->delete();

        ($model != null) ? $message = 'News deleted successfully' : $message = 'News not exist';
        return response()->json([
            'message' => $message
        ]);

    }

}