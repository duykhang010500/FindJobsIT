<?php
  
namespace App\Models;
  
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
  
class EmployerVerify extends Model
{
    use HasFactory;
  
    public $table = "employers_verify";
  
    /**
     * Write code on Method
     *
     * @return response()
     */
    protected $fillable = [
        'emp_id',
        'token',
    ];
  
    /**
     * Write code on Method
     *
     * @return response()
     */
    public function employer()
    {
        return $this->belongsTo(Employer::class,'emp_id');
    }
}