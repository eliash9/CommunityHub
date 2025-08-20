<?php

namespace App\Models;

use App\Traits\UsesTenantConnection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Member extends Model
{
    use HasFactory, UsesTenantConnection;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'user_id',
        'community_id',
        'role',
        'status',
        'joined_at',
        'notes',
    ];
    
    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'joined_at' => 'datetime',
    ];
    
    /**
     * Get the user that owns the member record.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    /**
     * Get the community that the member belongs to.
     */
    public function community()
    {
        return $this->belongsTo(Community::class);
    }
}
