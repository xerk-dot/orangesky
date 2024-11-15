import { executeNeo4j } from '~/utils/neo4j'

export async function POST(request: Request) {
  try {
    const { userData, followersData } = await request.json()
    
    // Create/merge the main user
    await executeNeo4j(
      `
      MERGE (u:User {did: $userDid})
      SET u.name = $name,
          u.email = $email
      RETURN u
      `,
      {
        userDid: userData.did,
        name: userData.name,
        email: userData.email
      }
    )

    // Create followers and relationships in batch
    const batchSize = 50
    for (let i = 0; i < followersData.length; i += batchSize) {
      const batch = followersData.slice(i, i + batchSize)
      await executeNeo4j(
        `
        UNWIND $followers AS follower
        MERGE (f:User {did: follower.did})
        SET f.handle = follower.handle,
            f.displayName = follower.displayName
        WITH f
        MATCH (u:User {did: $userDid})
        MERGE (f)-[:FOLLOWS]->(u)
        `,
        {
          userDid: userData.did,
          followers: batch
        }
      )
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error('Neo4j Error:', error)
    return Response.json(
      { error: 'Failed to save to Neo4j', details: (error as Error).message },
      { status: 500 }
    )
  }
} 