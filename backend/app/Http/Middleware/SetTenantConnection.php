<?php

namespace App\Http\Middleware;

use App\Models\Community;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class SetTenantConnection
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $communityId = $request->route('community');
        
        if (!$communityId) {
            return $next($request);
        }
        
        $community = Community::find($communityId);
        
        if (!$community) {
            return response()->json([
                'status' => 'error',
                'message' => 'Community not found'
            ], 404);
        }
        
        // Set the database connection for the tenant
        Config::set('database.connections.tenant.database', $community->database);
        DB::purge('tenant');
        
        // Share the community with the request
        $request->attributes->add(['community' => $community]);
        
        return $next($request);
    }
}