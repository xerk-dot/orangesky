import { executeNeo4j } from '~/utils/neo4j'

interface BlueskyUser {
  did: string
  handle: string
  displayName?: string
}

interface UserData {
  did: string
  name: string
  handle: string
  displayName: string
  isPorn: boolean
  isMale: boolean
  isFemale: boolean
  noSpecifiedGender: boolean
  discoveredFrom: string
}

interface SaveToNeo4jRequest {
  userData: UserData
  followersData: BlueskyUser[]
  followingData: BlueskyUser[]
}

export async function POST(request: Request) {
  try {
    const { userData, followersData, followingData } = await request.json()
    
    // Create/merge the main user node
    await executeNeo4j(
      `
      MERGE (u:User {did: $userDid})
      ON CREATE SET 
        u.name = $name,
        u.handle = $handle,
        u.displayName = $displayName,
        u.isPorn = $isPorn,
        u.isMale = $isMale,
        u.isFemale = $isFemale,
        u.noSpecifiedGender = $noSpecifiedGender,
        u.discoveredFrom = $discoveredFrom
      ON MATCH SET
        u.name = $name,
        u.handle = $handle,
        u.displayName = $displayName
      RETURN u
      `,
      {
        userDid: userData.did,
        name: userData.name,
        handle: userData.handle,
        displayName: userData.displayName,
        isPorn: userData.isPorn,
        isMale: userData.isMale,
        isFemale: userData.isFemale,
        noSpecifiedGender: userData.noSpecifiedGender,
        discoveredFrom: userData.discoveredFrom
      }
    )

    // Create followers relationships
    if (followersData?.length > 0) {
      await executeNeo4j(
        `
        UNWIND $followers AS follower
        MERGE (f:User {did: follower.did})
        ON CREATE SET
          f.handle = follower.handle,
          f.displayName = follower.displayName,
          f.discoveredFrom = 'follower'
        ON MATCH SET
          f.handle = follower.handle,
          f.displayName = follower.displayName
        WITH f
        MATCH (u:User {did: $userDid})
        MERGE (f)-[:FOLLOWS]->(u)
        `,
        {
          userDid: userData.did,
          followers: followersData
        }
      )
    }

    // Create following relationships
    if (followingData?.length > 0) {
      await executeNeo4j(
        `
        UNWIND $following AS follow
        MERGE (f:User {did: follow.did})
        ON CREATE SET
          f.handle = follow.handle,
          f.displayName = follow.displayName,
          f.discoveredFrom = 'following'
        ON MATCH SET
          f.handle = follow.handle,
          f.displayName = follow.displayName
        WITH f
        MATCH (u:User {did: $userDid})
        MERGE (u)-[:FOLLOWS]->(f)
        `,
        {
          userDid: userData.did,
          following: followingData
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