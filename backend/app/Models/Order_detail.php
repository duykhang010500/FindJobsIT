<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Order_detail extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'order_id', 'service_id','name','price',
        'qty','order_code','discount','active','expire','days'
    ];

    public function order(){
        return $this->belongsTo(Order::class,'id','order_id');
    }
    public function service(){
        return $this->belongsTo(Service::class,'id','service_id');
    }

}
