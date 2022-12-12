<?php

namespace App\Http\Controllers\admin;
use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator;
class MemberaController extends Controller
{
    //

    public function index()
    {
        //
        $members = Member::with(['candidate.job','candidate','resume'])->orderBy('id','desc')->get();
        return response()->json([
            'data' => $members,
        ]);
    }

    public function memberStatus(Request $request,$id){
        $member = Member::where('id', $id)->first();
        if(!empty($member)){
            $fields = Validator::make($request->all(), [
                'status' => 'required'
            ]);
            if ($fields->fails()) {
                return response()->json($fields->errors(), 422);
            }
            $member->update(['status' => $request->status]);
            return response()->json([
                'member' => $member,
                'message' => 'Update member status.'
            ]);
        }
        return response()->json([
            'message' => 'Member is not exist.'
        ]);
    }

}