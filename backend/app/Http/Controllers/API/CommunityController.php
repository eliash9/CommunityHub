<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Community;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class CommunityController extends Controller
{
    /**
     * Display a listing of the communities.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $communities = Community::all();
        
        return response()->json([
            'status' => 'success',
            'data' => $communities
        ]);
    }

    /**
     * Store a newly created community in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'timezone' => 'nullable|string|max:255',
            'locale' => 'nullable|string|max:10',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $slug = Str::slug($request->name);
        
        // Check if slug already exists
        $count = Community::where('slug', $slug)->count();
        if ($count > 0) {
            $slug = $slug . '-' . ($count + 1);
        }

        $community = Community::create([
            'name' => $request->name,
            'slug' => $slug,
            'description' => $request->description,
            'timezone' => $request->timezone ?? 'UTC',
            'locale' => $request->locale ?? 'en',
            'database' => 'community_' . $slug,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Community created successfully',
            'data' => $community
        ], 201);
    }

    /**
     * Display the specified community.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $community = Community::find($id);
        
        if (!$community) {
            return response()->json([
                'status' => 'error',
                'message' => 'Community not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $community
        ]);
    }

    /**
     * Update the specified community in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $community = Community::find($id);
        
        if (!$community) {
            return response()->json([
                'status' => 'error',
                'message' => 'Community not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'logo' => 'nullable|string',
            'cover_image' => 'nullable|string',
            'primary_color' => 'nullable|string|max:7',
            'secondary_color' => 'nullable|string|max:7',
            'timezone' => 'nullable|string|max:255',
            'locale' => 'nullable|string|max:10',
            'max_members' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $community->update($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Community updated successfully',
            'data' => $community
        ]);
    }

    /**
     * Remove the specified community from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $community = Community::find($id);
        
        if (!$community) {
            return response()->json([
                'status' => 'error',
                'message' => 'Community not found'
            ], 404);
        }

        $community->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Community deleted successfully'
        ]);
    }
}