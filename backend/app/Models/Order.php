<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\DB;

class Order extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'comp_id', 'code', 'active', 'expire', 'emp_id', 'total', 'status', 'note', 'payment_type', 'order_type','voucher_discount','discount','total_discount_vat'
    ];

    public function employer(){
        return $this->belongsTo(Employer::class,'emp_id');
    }

    public function company(){
        return $this->belongsTo(Company::class,'comp_id');
    }

    public function order_detail(){
        return $this->hasMany(Order_detail::class);
    }

    private $Auto_increment = null;
    public function getNextId()
    {
        $statement = DB::select("show table status like 'orders'");

        return $statement[0]->Auto_increment;
    }
}
