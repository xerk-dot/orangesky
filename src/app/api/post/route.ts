import { BskyAgent } from '@atproto/api'

export async function POST(request: Request) {
  if (!process.env.BSKY_IDENTIFIER || !process.env.BSKY_PASSWORD) {
    console.error('Missing Bluesky credentials in environment variables')
    return new Response('Server configuration error', { status: 500 })
  }

  try {
    const { text } = await request.json()
    
    const agent = new BskyAgent({
      service: 'https://bsky.social'
    })

    await agent.login({
      identifier: process.env.BSKY_IDENTIFIER,
      password: process.env.BSKY_PASSWORD
    })

    await agent.post({
      text,
      createdAt: new Date().toISOString(),
      langs: ['en']
    })
    
    return new Response('Posted successfully', { status: 200 })
  } catch (error) {
    console.error('Error posting to Bluesky:', error)
    return new Response('Error posting to Bluesky', { status: 500 })
  }
} 