'use client'

import { useState } from 'react'

export default function PostForm() {
  const [isPosting, setIsPosting] = useState(false)
  const [text, setText] = useState('')

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

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's on your mind?"
        className="p-2 border rounded"
        disabled={isPosting}
      />
      <button 
        onClick={handlePost} 
        disabled={isPosting || !text.trim()}
        className="p-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {isPosting ? 'Posting...' : 'Post to Bluesky'}
      </button>
    </div>
  )
} 