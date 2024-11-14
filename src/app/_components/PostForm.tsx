'use client'

import { useState } from 'react'

export default function PostForm() {
  const [isPosting, setIsPosting] = useState(false)
  const [text, setText] = useState('')
  const [profileData, setProfileData] = useState<any>(null)
  const [isFetching, setIsFetching] = useState(false)

  const handlePost = async () => {
    if (!text.trim()) return // Prevent empty posts
    
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
      
      // Clear the input after successful post
      setText('')
    } catch (error) {
      console.error('Failed to post:', error)
    } finally {
      setIsPosting(false)
    }
  }
  
  const handleFetchProfile = async () => {
    try {
      setIsFetching(true)
      const response = await fetch('/api/getUserProfile')
      const data = await response.json()
      setProfileData(data)
    } catch (error) {
      console.error('Failed to fetch profile:', error)
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
        className="p-2 border rounded"
        disabled={isPosting}
      />
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
          disabled={isFetching}
          className="p-2 bg-green-500 text-white rounded disabled:opacity-50"
        >
          {isFetching ? 'Fetching...' : 'Fetch Profile'}
        </button>
      </div>

      {profileData && (
        <div className="mt-4 p-4 bg-gray-50 rounded">
          <h3 className="font-bold text-black">Profile Data:</h3>
          <pre className="text-sm overflow-auto text-black">
            {JSON.stringify(profileData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
} 