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
    public function services()
    {
        //
        $services = Service::where('status',1)->orderBy('id','desc')->get();
        return response()->json([
            'services' => $services,
        ]);
    }

    public function order_active()
    {
        //
        $orders = Order::with('order_detail','company','employer')->where('status',1)->orderBy('id','desc')->get();
        return response()->json([
            'orders' => $orders,
        ]);
    }

    public function confirm_order(Request $request)
    {
            $data =  $request->json()->all();
            $order = new Order;
            $order->emp_id = auth()->user()->id;
            $order->comp_id = auth()->user()->company->id;
            $order->status = 1;
            $order->code = substr(md5(microtime()),rand(0,26),5);
            // dd((new Order)->getNextId());
            if($data['cart'] && $data['cart'][0]){   // check cart
                $total_cart = 0;
                foreach($data['cart'] as $key => $cart){
                    $order_details = new Order_detail;
                    $order_details->order_code = $order->code;
                    $order_details->order_id = (new Order)->getNextId();
                    $order_details->service_id = $cart['service_id'];
                    $service = Service::findOrFail($order_details->service_id);
                    $order_details->name =  $service->name;
                    $order_details->price =  $service->price;
                    $order_details->qty =  $cart['qty'];

                    $total_cart += $order_details->price*$order_details->qty;
                }

                $order_details->save();
            }else{
                return response([
                    'status' => 400,
                    'message' => 'Something is wrong in the cart'
                ], 400);
            }
            $order->total = $total_cart;
            if($data['note'])
                $order->note = $data['note'];
            $order->payment_type = $data['payment_type'];
            $order->save();
            return response([
                'message' => 'Order Success',
                'order' => $order,
            ], 201);
    }
}