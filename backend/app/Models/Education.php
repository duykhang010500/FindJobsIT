<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Education extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'educations';
    protected $fillable = [
        'edu_school', 'edu_certify', 'edu_date_start', 'edu_date_end', 'edu_current_end'
        , 'edu_description', 'resume_id'
    ];

    public function resume()
    {
        return $this->belongsTo(Resume::class,'resume_id');
    }
}
