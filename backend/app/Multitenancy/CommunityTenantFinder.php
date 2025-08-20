<?php

namespace App\Multitenancy;

use App\Models\Community;
use Illuminate\Http\Request;
use Spatie\Multitenancy\Models\Tenant;
use Spatie\Multitenancy\TenantFinder\TenantFinder;

class CommunityTenantFinder extends TenantFinder
{
    public function findForRequest(Request $request): ?Tenant
    {
        $communityId = $request->route('community');

        if (! $communityId) {
            return null;
        }

        return Community::find($communityId);
    }
}