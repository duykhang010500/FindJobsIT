<?php

namespace App\Http\Controllers\employer;
use App\Http\Controllers\Controller;
use App\Models\Employer;
use App\Models\Company;
use App\Models\Job;
use App\Models\Order;
use App\Models\Order_detail;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator;
class OrderController extends Controller
{
    //
    public function index()
    {
        //
        $services = Service::orderBy('id','desc')->get();
        return response()->json([
            'services' => $services,
        ]);
    }

    public function confirm_order(Request $request)
    {
            $data =  $request->json()->all();
            $order = new Order;
            $order->emp_id = auth('sanctum')->user()->id;
            $order->comp_id = auth('sanctum')->user()->company->id;
            $order->status = 1;
            $order->code = substr(md5(microtime()),rand(0,26),5);
            // dd((new Order)->getNextId());
            if($data['cart']){   // check cart
                // $check_p = 0;
                // foreach($data['cart'] as $c => $value){ // check product exist
                //     $check_product = Product::where('id',$value['product_id'])->first();
                //     if($check_product === null){
                //         return response([
                //             'status' => 400,
                //             'message' => 'Something is wrong in the cart'
                //         ], 400);
                //     }
                // }
                foreach($data['cart'] as $key => $cart){
                    $order_details = new Order_detail;
                    $order_details->order_code = $order->code;
                    $order_details->order_id = (new Order)->getNextId();
                    $order_details->service_id = $cart['service_id'];
                    $service = Service::findOrFail($order_details->service_id);
                    $order_details->name =  $service->name;
                    $order_details->price =  $service->price;
                    $order_details->qty =  $cart['qty'];
                }

                $order_details->save();
            }
            $order->total = 1;
            $order->save();
            return response([
                'message' => 'Order Success',
                // 'order' => new OrderResource($order),
            ], 201);
    }
}