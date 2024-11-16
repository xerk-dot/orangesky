import { BskyAgent } from '@atproto/api';
import { prisma } from "~/server/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let { handle } = body;

    console.log('Analyzing connections for handle:', handle);

    // Clean and validate the handle
    handle = handle.trim().toLowerCase();
    if (!handle.includes('.')) {
      handle = `${handle}.bsky.social`;
    }

    if (!process.env.BSKY_IDENTIFIER || !process.env.BSKY_PASSWORD) {
      return Response.json({ 
        error: "Missing Bluesky credentials" 
      }, { status: 500 });
    }

    // First, verify the profile exists in our database
    const existingProfile = await prisma.BlueskyUser.findFirst({
      where: { handle: handle }
    });

    if (!existingProfile) {
      return Response.json({ 
        error: "Profile not found in database" 
      }, { status: 404 });
    }

    const agent = new BskyAgent({
      service: 'https://bsky.social'
    });

    await agent.login({
      identifier: process.env.BSKY_IDENTIFIER,
      password: process.env.BSKY_PASSWORD
    });

    try {
      // Get followers with pagination
      const followers = await agent.getFollowers({
        actor: handle,
        limit: 50
      });
      
      // Get following with pagination
      const following = await agent.getFollows({
        actor: handle,
        limit: 50
      });

      console.log('Fetched connections:', {
        followersCount: followers.data.followers.length,
        followingCount: following.data.follows.length
      });

      // Update the main profile
      await prisma.BlueskyUser.update({
        where: { did: existingProfile.did },
        data: {
          isFiftyMostRecentFollowAnalyzed: true,
          numOfFollowers: followers.data.followers.length,
          numOfFollowing: following.data.follows.length,
        },
      });

      // Process followers
      for (const follower of followers.data.followers) {
        await prisma.BlueskyUser.upsert({
          where: { did: follower.did },
          update: {
            handle: follower.handle,
            displayName: follower.displayName ?? null,
            updatedAt: new Date(),
          },
          create: {
            did: follower.did,
            handle: follower.handle,
            displayName: follower.displayName ?? null,
            isProfileAnalyzed: false,
            isFiftyMostRecentFollowAnalyzed: false,
            isIndividual: 0,
            isMale: 0,
            numOfFollowers: 0,
            numOfFollowing: 0,
            bio: null,
          },
        });
      }

      // Process following
      for (const follows of following.data.follows) {
        await prisma.BlueskyUser.upsert({
          where: { did: follows.did },
          update: {
            handle: follows.handle,
            displayName: follows.displayName ?? null,
            updatedAt: new Date(),
          },
          create: {
            did: follows.did,
            handle: follows.handle,
            displayName: follows.displayName ?? null,
            isProfileAnalyzed: false,
            isFiftyMostRecentFollowAnalyzed: false,
            isIndividual: 0,
            isMale: 0,
            numOfFollowers: 0,
            numOfFollowing: 0,
            bio: null,
          },
        });
      }

      return Response.json({ 
        success: true,
        followersAdded: followers.data.followers.length,
        followingAdded: following.data.follows.length,
        profile: existingProfile.handle
      });

    } catch (apiError) {
      console.error('Bluesky API error:', apiError);
      return Response.json({ 
        error: "Failed to fetch connections from Bluesky",
        details: apiError instanceof Error ? apiError.message : 'Unknown error'
      }, { status: 502 });
    }

  } catch (error) {
    console.error('General error:', error);
    return Response.json({ 
      error: "Failed to analyze connections",
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 