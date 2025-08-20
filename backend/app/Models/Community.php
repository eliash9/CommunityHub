<?php

namespace App\Models;

use App\Traits\UsesLandlordConnection;
use Illuminate\Database\Eloquent\Model;
use Spatie\Multitenancy\Models\Tenant as BaseTenant;

class Community extends BaseTenant
{
    use UsesLandlordConnection;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'logo',
        'cover_image',
        'primary_color',
        'secondary_color',
        'timezone',
        'locale',
        'max_members',
        'is_active',
        'database',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'max_members' => 'integer',
    ];

    public function members()
    {
        return $this->hasMany(Member::class);
    }

    public function events()
    {
        return $this->hasMany(Event::class);
    }

    public function announcements()
    {
        return $this->hasMany(Announcement::class);
    }

    public function polls()
    {
        return $this->hasMany(Poll::class);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
