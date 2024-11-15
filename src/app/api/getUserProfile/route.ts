import { BskyAgent } from '@atproto/api'

export async function GET() {
  try {
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

    //const { data } = await agent.getProfile({ actor: 'did:plc:nlbv2nh67adpas6nhn7muwb4' })
    //const { data } = await agent.app.bsky.graph.getFollows({ actor: 'did:plc:nlbv2nh67adpas6nhn7muwb4' })
    const { data } = await agent.app.bsky.graph.getFollowers({ actor: 'did:plc:z72i7hdynmk6r22z27h6tvur' })  //@bluesky.bsky.social

    //@gabrielcoimbraofc.bsky.social starting point for porn
    return Response.json(data)
  } catch (error) {
    console.error('Error fetching profile:', error)
    return Response.json({ error: 'Failed to fetch profile' }, { status: 500 })
  }
} 