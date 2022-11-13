<?php

namespace App\Http\Controllers\admin;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Order_detail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator,Carbon\Carbon,Mail;
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
        if($request->status == 3)
            $now = Carbon::now('Asia/Ho_Chi_Minh')->format('H:i:s d-m-Y');
            $title_mail = "Đơn hàng đã được xác nhận vào lúc".' '.$now;
            //lay gio hang
            $order_details_mail = Order_detail::where('order_code', $order->code)->get();
            // dd($order_details_mail);
            // return response([
            //     'message' => 'Change status order successfully',
            //     'order' => $order_details_mail,
            // ], 200);
            foreach($order_details_mail  as $key ){
                $daysToAdd = $key->days;
                $date = now('Asia/Ho_Chi_Minh')->addDays($daysToAdd);
                // dd($date);
                $key->expire = $date;
                $key->save();
                $cart_array[] = array(
                    'product_name' => $key->name,
                    'product_price' => $key->price,
                    'product_qty' => $key->qty,
                );
            }
            $shipping_array = array(
                'note' => $order->note,
                'comp_name' =>$order->company->name,
                'name' =>$order->employer->name,
                'email' =>$order->employer->email,
                'phone' =>$order->employer->phone,
                'method' => $order->payment_type,
            );
            //lay ma giam gia, lay coupon code
            $ordercode_mail = array(
            //    'coupon_code' => $order->evoucher,
               'order_code' => $order->code,
               'total' => $order->total,
               'now' => $now
            );
            Mail::send('comfirm_order',  ['cart_array'=>$cart_array, 'shipping_array'=>$shipping_array ,'code'=>$ordercode_mail] , function($message) use ($title_mail,$order){
                $message->to($order->employer->email)->subject($title_mail);//send this mail with subject
                $message->from('contact@hktech.com',$title_mail);//send from this mail
            });
        $order->update($field->validated());
        return response([
            'message' => 'Change status order successfully',
            'order' => $order,
        ], 200);

    }

}
