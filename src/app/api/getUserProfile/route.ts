import { BskyAgent } from '@atproto/api'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const profile = searchParams.get('profile')

    if (!profile) {
      return Response.json({ error: 'Profile parameter is required' }, { status: 400 })
    }

    if (!process.env.BSKY_IDENTIFIER || !process.env.BSKY_PASSWORD) {
      console.error('Missing Bluesky credentials in environment variables')
      return Response.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const agent = new BskyAgent({
      service: 'https://bsky.social'
    })

    await agent.login({
      identifier: process.env.BSKY_IDENTIFIER,
      password: process.env.BSKY_PASSWORD
    })

    // First get the profile info
    const profileInfo = await agent.getProfile({ actor: profile })
    
    // Then get the followers
    const followersResponse = await agent.app.bsky.graph.getFollowers({ actor: profile })

    // Combine and return the data
    return Response.json({
      did: profileInfo.data.did,
      handle: profileInfo.data.handle,
      displayName: profileInfo.data.displayName,
      name: profileInfo.data.displayName, // Using displayName as name if not available
      followers: followersResponse.data.followers.map(follower => ({
        did: follower.did,
        handle: follower.handle,
        displayName: follower.displayName
      }))
    })
  } catch (error) {
    console.error('Error fetching profile:', error)
    return Response.json({ 
      error: error instanceof Error ? error.message : 'Failed to fetch profile' 
    }, { status: 500 })
  }
} 