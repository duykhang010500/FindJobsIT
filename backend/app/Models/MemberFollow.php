<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class MemberFollow extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'member_following';

    protected $fillable = [
        'member_id','comp_id'
    ];

    public function member(){
        return $this->belongsTo(Member::class);
    }

    public function company(){
        return $this->belongsTo(Company::class,'comp_id');
    }

}
