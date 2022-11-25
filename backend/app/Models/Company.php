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
    const   STATUS_PENDING = 0,
            STATUS_PUBLISHED = 1,
            STATUS_CLOSED = 2,
            STATUS_REJECTED = 3;

    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'logo', 'name', 'address', 'website', 'email', 'phone', 'fax', 'tax', 'industry_id', 'location', 'contact_name','status'
        , 'video', 'images', 'content', 'banners', 'company_size', 'hirings', 'followed', 'viewed', 'group_rating', 'keywords'
    ];

    public function employer(){
        return $this->belongsTo(Employer::class);
    }

    public function jobs(){
        return $this->hasMany(Job::class);
    }

    public function candidates(){
        return $this->hasMany(Candidates::class);
    }

    public function orders(){
        return $this->hasMany(Order::class);
    }
}
