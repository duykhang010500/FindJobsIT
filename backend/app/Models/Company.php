<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Company extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'logo', 'name', 'address', 'website', 'email', 'phone', 'fax', 'tax', 'industry_id', 'location', 'contact_name'
        , 'video', 'images', 'content', 'banners', 'company_size', 'hirings', 'followed', 'viewed', 'group_rating', 'keywords'
    ];

    public function user(){
        return $this->belongsTo(Employer::class);
    }
}
