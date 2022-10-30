<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class News extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'title','intro','content','image', 'catid','status','type'
    ];

    public function categories()
    {
        return $this->belongsTo(NewsCat::class,'catid');
    }
}
