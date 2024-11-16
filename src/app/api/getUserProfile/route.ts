import { BskyAgent } from '@atproto/api'
import { prisma } from '~/server/db'
import { z } from 'zod'

// Define request body schema
const requestSchema = z.object({
  handle: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    // Add proper typing for the raw body
    const rawBody = await request.json() as z.infer<typeof requestSchema>;
    const result = requestSchema.safeParse(rawBody);
    
    if (!result.success) {
      return Response.json({ 
        error: "Invalid request",
        details: "Please provide a valid Bluesky handle"
      }, { status: 400 });
    }

    let handle: string = result.data.handle;

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
      await agent.login({
        identifier: process.env.BSKY_IDENTIFIER,
        password: process.env.BSKY_PASSWORD
      });

      const profile = await agent.getProfile({ actor: handle });

      if (!profile?.data?.did) {
        return Response.json({ 
          error: "Invalid profile data",
          details: "Profile data is missing required fields"
        }, { status: 400 });
      }

      const user = await prisma.blueskyUser.upsert({
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

    } catch (profileError) {
      const error = profileError as Error;
      console.error('Profile error:', {
        message: error.message,
        stack: error.stack,
      });
      
      return Response.json({ 
        error: "Bluesky API error",
        details: error.message || "Failed to fetch profile from Bluesky"
      }, { status: 502 });
    }
    
  } catch (error) {
    const err = error as Error;
    console.error('General error:', {
      message: err.message,
      stack: err.stack
    });
    
    return Response.json({ 
      error: "Internal server error",
      details: err.message
    }, { status: 500 });
  }
} 