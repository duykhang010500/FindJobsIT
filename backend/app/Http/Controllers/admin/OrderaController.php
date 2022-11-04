<?php

namespace App\Http\Controllers\admin;
use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use Validator;
class OrderaController extends Controller
{
    //
    public function index()
    {
        //
        $orders = Order::with('order_detail','company','employer')->orderBy('id','desc')->get();
        return response()->json([
            'orders' => $orders,
        ]);
    }

    public function order(Request $request,$id)
    {
        //
        $order = Order::with('order_detail','company','employer')->where('id',$id)->first();
        return response()->json([
            'order' => $order,
        ]);
    }

    public function change_status_order(Request $request,$id){
        $order= Order::where('id', $id)->first();
        $field = Validator::make($request->all(), [
            'status'  => 'required',
        ]);
        if ($field->fails()) {
            return response()->json($field->errors(), 422);
        }

        if($request->status > 4)
            return response([
                'message' => 'Choose 1:processing, 2:processed 3:reject, 4: customer cancel',
            ], 400);
        $order->update($field->validated());
        return response([
            'message' => 'Change status order successfully',
            'order' => $order,
        ], 200);

    }

}
