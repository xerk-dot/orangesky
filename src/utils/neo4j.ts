import neo4j from 'neo4j-driver'

interface Neo4jUserParams {
  userDid: string
  name?: string
  handle?: string
  displayName?: string
  isPorn?: boolean
  isMale?: boolean
  isFemale?: boolean
  noSpecifiedGender?: boolean
  discoveredFrom?: string
  followers?: Array<{
    did: string
    handle: string
    displayName?: string
  }>
}

const driver = neo4j.driver(
  process.env.NEO4J_URI ?? '',
  neo4j.auth.basic(process.env.NEO4J_USER ?? '', process.env.NEO4J_PASSWORD ?? '')
)

export async function executeNeo4j(cypher: string, params: Neo4jUserParams) {
  const session = driver.session()
  try {
    return await session.run(cypher, params)
  } finally {
    await session.close()
  }
}

export async function closeNeo4jConnection() {
  await driver.close()
} 