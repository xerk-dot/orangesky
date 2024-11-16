import { BskyAgent } from '@atproto/api'
import { prisma } from '~/server/db'
import { env } from '~/env'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

if (!process.env.BSKY_IDENTIFIER || !process.env.BSKY_PASSWORD) {
  console.error('Missing Bluesky credentials in environment variables');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let { handle } = body;

    if (!handle) {
      return Response.json({ 
        error: "Handle is required",
        details: "Please provide a Bluesky handle"
      }, { status: 400 });
    }

    // Clean and validate the handle
    handle = handle.trim().toLowerCase();
    if (!handle.includes('.')) {
      handle = `${handle}.bsky.social`;
    }

    if (!process.env.BSKY_IDENTIFIER || !process.env.BSKY_PASSWORD) {
      console.error('Missing Bluesky credentials in environment variables');
      return Response.json({ 
        error: "Server configuration error",
        details: "Missing Bluesky credentials"
      }, { status: 500 });
    }

    const agent = new BskyAgent({
      service: 'https://bsky.social'
    });

    try {
      console.log('Attempting login with:', {
        identifier: process.env.BSKY_IDENTIFIER,
        passwordPresent: !!process.env.BSKY_PASSWORD
      });

      await agent.login({
        identifier: process.env.BSKY_IDENTIFIER,
        password: process.env.BSKY_PASSWORD
      });

      console.log('Fetching profile for:', handle);
      const profile = await agent.getProfile({ actor: handle });

      if (!profile?.data?.did) {
        return Response.json({ 
          error: "Invalid profile data",
          details: "Profile data is missing required fields"
        }, { status: 400 });
      }

      const user = await prisma.BlueskyUser.upsert({
        where: { did: profile.data.did },
        update: {
          handle: profile.data.handle,
          displayName: profile.data.displayName ?? null,
          bio: profile.data.description ?? null,
          updatedAt: new Date(),
        },
        create: {
          did: profile.data.did,
          handle: profile.data.handle,
          displayName: profile.data.displayName ?? null,
          bio: profile.data.description ?? null,
          isFiftyMostRecentFollowAnalyzed: false,
          isProfileAnalyzed: false,
          isIndividual: 0,
          isMale: 0,
          numOfFollowers: 0,
          numOfFollowing: 0,
        },
      });

      return Response.json({ 
        success: true, 
        user,
        message: "Profile fetched and saved successfully"
      });

    } catch (profileError: any) {
      console.error('Profile error:', {
        message: profileError.message,
        stack: profileError.stack,
        response: profileError.response?.data
      });
      
      return Response.json({ 
        error: "Bluesky API error",
        details: profileError.message || "Failed to fetch profile from Bluesky"
      }, { status: 502 });
    }

  } catch (error: any) {
    console.error('General error:', {
      message: error.message,
      stack: error.stack
    });
    
    return Response.json({ 
      error: "Internal server error",
      details: error.message || "An unexpected error occurred"
    }, { status: 500 });
  }
} 