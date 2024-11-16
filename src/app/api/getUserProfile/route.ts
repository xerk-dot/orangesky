import { BskyAgent } from '@atproto/api'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    let profile = searchParams.get('profile')

    if (!profile) {
      return Response.json({ error: 'Profile parameter is required' }, { status: 400 })
    }

    // Handle different profile formats
    if (!profile.startsWith('did:') && !profile.includes('.')) {
      profile = `${profile}.bsky.social`
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

    try {
      // First try with the profile as-is
      const profileInfo = await agent.getProfile({ actor: profile })
      
      const followersNotNeeded = searchParams.get('followersNotNeeded') === 'true'

      if (followersNotNeeded) {
        return Response.json({
          did: profileInfo.data.did,
          handle: profileInfo.data.handle,
          displayName: profileInfo.data.displayName,
          name: profileInfo.data.displayName,
          followers: [],
          following: []
        })
      }

      // Get both followers and following
      const [followersResponse, followingResponse] = await Promise.all([
        agent.app.bsky.graph.getFollowers({ actor: profile, limit: 50 }),
        agent.app.bsky.graph.getFollows({ actor: profile, limit: 50 })
      ])

      return Response.json({
        did: profileInfo.data.did,
        handle: profileInfo.data.handle,
        displayName: profileInfo.data.displayName,
        name: profileInfo.data.displayName,
        followers: followersResponse.data.followers.map(follower => ({
          did: follower.did,
          handle: follower.handle,
          displayName: follower.displayName
        })),
        following: followingResponse.data.follows.map(follow => ({
          did: follow.did,
          handle: follow.handle,
          displayName: follow.displayName
        }))
      })
    } catch (profileError) {
      // If that fails, try with .bsky.social appended
      try {
        const fullHandle = profile.includes('.') ? profile : `${profile}.bsky.social`
        const profileInfo = await agent.getProfile({ actor: fullHandle })
        
        // Get both followers and following
        const [followersResponse, followingResponse] = await Promise.all([
          agent.app.bsky.graph.getFollowers({ actor: fullHandle, limit: 50 }),
          agent.app.bsky.graph.getFollows({ actor: fullHandle, limit: 50 })
        ])

        return Response.json({
          did: profileInfo.data.did,
          handle: profileInfo.data.handle,
          displayName: profileInfo.data.displayName,
          name: profileInfo.data.displayName,
          followers: followersResponse.data.followers.map(follower => ({
            did: follower.did,
            handle: follower.handle,
            displayName: follower.displayName
          })),
          following: followingResponse.data.follows.map(follow => ({
            did: follow.did,
            handle: follow.handle,
            displayName: follow.displayName
          }))
        })
      } catch (retryError) {
        throw new Error('Profile not found with any handle format')
      }
    }
  } catch (error) {
    console.error('Error fetching profile:', error)
    return Response.json({ 
      error: error instanceof Error ? error.message : 'Failed to fetch profile' 
    }, { status: 500 })
  }
} 