<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class NewsCat extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'news_categories';
    protected $fillable = [
        'name','priority','status','type'
    ];

    public function news(){
        return $this->hasMany(News::class);
    }
}
