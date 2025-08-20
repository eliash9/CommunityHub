<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Community;
use App\Models\Member;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MemberController extends Controller
{
    /**
     * Display a listing of the members for a community.
     *
     * @param  int  $communityId
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($communityId)
    {
        $community = Community::find($communityId);
        
        if (!$community) {
            return response()->json([
                'status' => 'error',
                'message' => 'Community not found'
            ], 404);
        }

        $members = $community->members()->with('user')->get();
        
        return response()->json([
            'status' => 'success',
            'data' => $members
        ]);
    }

    /**
     * Add a user to a community.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $communityId
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request, $communityId)
    {
        $community = Community::find($communityId);
        
        if (!$community) {
            return response()->json([
                'status' => 'error',
                'message' => 'Community not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'role' => 'nullable|string|in:member,moderator,admin',
            'status' => 'nullable|string|in:active,inactive,banned',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Check if user is already a member
        $existingMember = Member::where('user_id', $request->user_id)
            ->where('community_id', $communityId)
            ->first();
            
        if ($existingMember) {
            return response()->json([
                'status' => 'error',
                'message' => 'User is already a member of this community'
            ], 422);
        }

        $member = Member::create([
            'user_id' => $request->user_id,
            'community_id' => $communityId,
            'role' => $request->role ?? 'member',
            'status' => $request->status ?? 'active',
            'joined_at' => now(),
            'notes' => $request->notes,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Member added successfully',
            'data' => $member
        ], 201);
    }

    /**
     * Display the specified member.
     *
     * @param  int  $communityId
     * @param  int  $memberId
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($communityId, $memberId)
    {
        $community = Community::find($communityId);
        
        if (!$community) {
            return response()->json([
                'status' => 'error',
                'message' => 'Community not found'
            ], 404);
        }

        $member = Member::where('id', $memberId)
            ->where('community_id', $communityId)
            ->with('user')
            ->first();
            
        if (!$member) {
            return response()->json([
                'status' => 'error',
                'message' => 'Member not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $member
        ]);
    }

    /**
     * Update the specified member in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $communityId
     * @param  int  $memberId
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $communityId, $memberId)
    {
        $community = Community::find($communityId);
        
        if (!$community) {
            return response()->json([
                'status' => 'error',
                'message' => 'Community not found'
            ], 404);
        }

        $member = Member::where('id', $memberId)
            ->where('community_id', $communityId)
            ->first();
            
        if (!$member) {
            return response()->json([
                'status' => 'error',
                'message' => 'Member not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'role' => 'nullable|string|in:member,moderator,admin',
            'status' => 'nullable|string|in:active,inactive,banned',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $member->update($request->only(['role', 'status', 'notes']));

        return response()->json([
            'status' => 'success',
            'message' => 'Member updated successfully',
            'data' => $member
        ]);
    }

    /**
     * Remove the specified member from storage.
     *
     * @param  int  $communityId
     * @param  int  $memberId
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($communityId, $memberId)
    {
        $community = Community::find($communityId);
        
        if (!$community) {
            return response()->json([
                'status' => 'error',
                'message' => 'Community not found'
            ], 404);
        }

        $member = Member::where('id', $memberId)
            ->where('community_id', $communityId)
            ->first();
            
        if (!$member) {
            return response()->json([
                'status' => 'error',
                'message' => 'Member not found'
            ], 404);
        }

        $member->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Member removed from community successfully'
        ]);
    }
}