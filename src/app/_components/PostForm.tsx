'use client'

import { useState } from 'react'

interface BlueskyFollower {
  did: string
  handle: string
  displayName?: string
}

interface ProfileData {
  followers: BlueskyFollower[]
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

export default function PostForm() {
  const [isPosting, setIsPosting] = useState(false)
  const [text, setText] = useState('')
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [isFetching, setIsFetching] = useState(false)
  const [targetProfile, setTargetProfile] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handlePost = async () => {
    if (!text.trim()) return
    
    try {
      setIsPosting(true)
      const response = await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text })
      })
      
      if (!response.ok) {
        throw new Error('Failed to post')
      }
      
      setText('')
    } catch (error) {
      console.error('Failed to post:', error)
    } finally {
      setIsPosting(false)
    }
  }
  
  const handleFetchProfile = async () => {
    if (!targetProfile.trim()) {
      setError('Please enter a profile handle or DID')
      return
    }

    try {
      setError(null)
      setIsFetching(true)
      
      // First fetch the profile data
      const response = await fetch(`/api/getUserProfile?profile=${encodeURIComponent(targetProfile)}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch profile')
      }
      
      setProfileData(data)

      // Then save to Neo4j
      const neo4jResponse = await fetch('/api/saveToNeo4j', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userData: {
            did: targetProfile.startsWith('did:') ? targetProfile : data.did,
            name: data.name || targetProfile,
            handle: data.handle || targetProfile,
            displayName: data.displayName || targetProfile,
            isPorn: false,
            isMale: false,
            isFemale: false,
            noSpecifiedGender: true,
            discoveredFrom: 'manual'
          },
          followersData: data.followers
        })
      })

      const neo4jData = await neo4jResponse.json()
      
      if (!neo4jResponse.ok) {
        throw new Error(neo4jData.error || 'Failed to save to Neo4j')
      }

      // Success message
      setError(null)
    } catch (err) {
      const error = err as Error
      setError(error.message)
      console.error('Failed to fetch profile or save to Neo4j:', error)
    } finally {
      setIsFetching(false)
    }
  }

  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
    return null
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's on your mind?"
        className="p-2 border border-gray-600 rounded bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-gray-400"
        disabled={isPosting}
        style={{ color: 'white' }}
      />

      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={targetProfile}
          onChange={(e) => setTargetProfile(e.target.value)}
          placeholder="Enter Bluesky handle or DID"
          className="p-2 border border-gray-600 rounded bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-gray-400"
          disabled={isFetching}
          style={{ color: 'white' }}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
      
      <div className="flex gap-2">
        <button 
          onClick={handlePost} 
          disabled={isPosting || !text.trim()}
          className="p-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {isPosting ? 'Posting...' : 'Post to Bluesky'}
        </button>
        <button 
          onClick={handleFetchProfile}
          disabled={isFetching || !targetProfile.trim()}
          className="p-2 bg-green-500 text-white rounded disabled:opacity-50"
        >
          {isFetching ? 'Fetching...' : 'Fetch Profile'}
        </button>
      </div>

      {profileData && (
        <div className="mt-4 p-4 bg-gray-800 rounded">
          <h3 className="font-bold text-white">Profile Data:</h3>
          <pre className="text-sm overflow-auto text-white">
            {JSON.stringify(profileData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
} 