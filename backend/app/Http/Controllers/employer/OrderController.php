<?php

namespace App\Http\Controllers\employer;
use App\Http\Controllers\Controller;
use App\Models\Employer;
use App\Models\Company;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator;
class OrderController extends Controller
{
    //
    public function confirm_order(Request $request)
    {
            $data =  $request->json()->all();
            if($data['cart']){   // check cart
                $check_p = 0;
                // foreach($data['cart'] as $c => $value){ // check product exist
                //     $check_product = Product::where('id',$value['product_id'])->first();
                //     if($check_product === null){
                //         return response([
                //             'status' => 400,
                //             'message' => 'Something is wrong in the cart'
                //         ], 400);
                //     }
                // }

            }

            return response([
                'message' => 'Order Success',
                // 'order' => new OrderResource($order),
            ], 201);
    }
}