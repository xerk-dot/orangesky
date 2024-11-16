import { BskyAgent } from '@atproto/api'
import { prisma } from '~/server/db'
import { env } from '~/env'

export async function POST(request: Request) {
  if (!process.env.BSKY_IDENTIFIER || !process.env.BSKY_PASSWORD) {
    console.error('Missing Bluesky credentials in environment variables')
    return new Response('Server configuration error', { status: 500 })
  }

  try {
    const { handle } = await request.json()
    
    const agent = new BskyAgent({
      service: 'https://bsky.social'
    })

    // Login to Bluesky
    await agent.login({
      identifier: process.env.BSKY_IDENTIFIER,
      password: process.env.BSKY_PASSWORD,
    })

    // Get the profile
    const profile = await agent.getProfile({ actor: handle })
    
    // Get followers and following counts
    const followers = await agent.getFollowers({ actor: handle })
    const following = await agent.getFollows({ actor: handle })

    // Upsert the main profile
    const user = await prisma.BlueskyUser.upsert({
      where: { did: profile.data.did },
      update: {
        handle: profile.data.handle,
        displayName: profile.data.displayName ?? null,
        bio: profile.data.description ?? null,
        numOfFollowers: followers.data.total,
        numOfFollowing: following.data.total,
        updatedAt: new Date(),
      },
      create: {
        did: profile.data.did,
        handle: profile.data.handle,
        displayName: profile.data.displayName ?? null,
        bio: profile.data.description ?? null,
        numOfFollowers: followers.data.total,
        numOfFollowing: following.data.total,
        isAnalyzed: false,
        isIndividual: 0,
        isMale: 0,
      },
    })

    console.log('Saved user:', user)

    // Also save all followers
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
          isAnalyzed: false,
          isIndividual: 0,
          isMale: 0,
          numOfFollowers: 0,  // We'll update these later if this profile is searched
          numOfFollowing: 0,
          bio: null,
        },
      })
    }

    // And save all following
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
          isAnalyzed: false,
          isIndividual: 0,
          isMale: 0,
          numOfFollowers: 0,
          numOfFollowing: 0,
          bio: null,
        },
      })
    }

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Error fetching profile:', error)
    return new Response('Error fetching profile', { status: 500 })
  }
} 