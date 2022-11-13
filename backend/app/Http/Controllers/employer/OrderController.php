<?php

namespace App\Http\Controllers\employer;
use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\Order;
use App\Models\Order_detail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator,Carbon\Carbon,Mail;
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

    public function orders()
    {
        //
        $orders = Order::with('order_detail','company','employer')->where('comp_id',auth()->user()->company->id)->orderBy('id','desc')->get();
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

    public function confirm_order(Request $request)
    {
            $data =  $request->json()->all();
            $order = new Order;
            $order->emp_id = auth()->user()->id;
            $order->comp_id = auth()->user()->company->id;
            $order->status = 0;
            $order->code = substr(md5(microtime()),rand(0,26),8);
            // dd((new Order)->getNextId());
            if($data['cart'] && $data['cart'][0]){   // check cart
                $total_cart = 0;
                foreach($data['cart'] as $key => $cart){
                    $order_details = new Order_detail;
                    $order_details->order_code = $order->code;
                    $order_details->order_id = (new Order)->getNextId();
                    // dd((new Order)->getNextId());
                    $order_details->service_id = $cart['service_id'];
                    $service = Service::findOrFail($order_details->service_id);
                    $order_details->name =  $service->name;
                    $order_details->price =  $service->price;
                    $order_details->qty =  $cart['qty'];

                    $total_cart += $order_details->price*$order_details->qty;
                    $order_details->save();
                }

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

            //send mail confirm
            $now = Carbon::now('Asia/Ho_Chi_Minh')->format('H:i:s d-m-Y');
            $title_mail = "Đơn hàng được đặt vào lúc".' '.$now;
            $user = auth()->user();
            $data['email'] = $user->email;
            //lay gio hang
            $order_details_mail = Order_detail::where('order_code', $order->code)->get();
            foreach($order_details_mail  as $key ){
                $cart_array[] = array(
                    'product_name' => $key->name,
                    'product_price' => $key->price,
                    'product_qty' => $key->qty,
                );
            }

            $shipping_array = array(
                'note' => $data['note'],
                'comp_name' =>auth()->user()->company->name,
                'name' =>auth()->user()->name,
                'email' =>auth()->user()->email,
                'phone' =>auth()->user()->phone,
                'method' => $data['payment_type']
            );
            //lay ma giam gia, lay coupon code
            $ordercode_mail = array(
            //    'coupon_code' => $order->evoucher,
               'order_code' => $order->code,
               'total' => $order->total,
               'now' => $now
            );
            // dd($shipping_array);
            Mail::send('order',  ['cart_array'=>$cart_array, 'shipping_array'=>$shipping_array ,'code'=>$ordercode_mail] , function($message) use ($title_mail,$data){
                $message->to(auth()->user()->email)->subject($title_mail);//send this mail with subject
                $message->from(auth()->user()->email,$title_mail);//send from this mail
            });

            return response([
                'message' => 'Order Success',
                'order' => $order,
            ], 201);
    }

    public function change_status_order(Request $request,$id){
        $order= Order::where('id', $id)->first();
        $field = Validator::make($request->all(), [
            'status'  => 'required',
        ]);
        if ($field->fails()) {
            return response()->json($field->errors(), 422);
        }

        if($request->status != 4){
            return response([
                'message' => 'Choose 4: customer cancel',
            ], 400);
        }else{
            return response([
                'message' => 'You has been cancel order',
            ], 400);
        }

        if($order->status == 1 || $order->status == 2){ // Processing, processed
            return response([
                'message' => 'Order has been processing or processed',
            ], 400);
        }else{
            $order->update($field->validated());
            return response([
                'message' => 'Change status order successfully'
            ], 200);
        }
    }
}