'use client'

import { useState, useEffect } from 'react'

export default function PostForm() {
  const [targetProfile, setTargetProfile] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState('')
  const [totalRows, setTotalRows] = useState<number>(0)

  const fetchTotalRows = async () => {
    try {
      const response = await fetch('/api/getUserProfile/count', {
        method: 'GET',
      })
      if (!response.ok) throw new Error('Failed to fetch count')
      const data = await response.json()
      setTotalRows(data.count)
    } catch (err) {
      console.error('Error fetching count:', err)
    }
  }

  useEffect(() => {
    fetchTotalRows()
  }, [])

  const handleFetchProfile = async () => {
    if (!targetProfile.trim()) return
    
    setIsFetching(true)
    setError('')

    try {
      const response = await fetch('/api/getUserProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ handle: targetProfile.trim() }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch profile')
      }

      const data = await response.json()
      console.log('Profile saved:', data)
      setTargetProfile('')
      fetchTotalRows()
      
    } catch (err) {
      console.error('Error:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch profile')
    } finally {
      setIsFetching(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <div className="mb-4">
        <label htmlFor="profile" className="block text-sm font-medium text-gray-700 mb-2">
          Bluesky Handle
        </label>
        <input
          id="profile"
          type="text"
          value={targetProfile}
          onChange={(e) => setTargetProfile(e.target.value)}
          placeholder="e.g., jay.bsky.social"
          className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          disabled={isFetching}
        />
      </div>

      {error && (
        <div className="mb-4 text-red-500 text-sm">
          {error}
        </div>
      )}

      <button
        onClick={handleFetchProfile}
        disabled={isFetching || !targetProfile.trim()}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isFetching ? 'Fetching Profile...' : 'Fetch Profile'}
      </button>

      <div className="mt-4 text-center text-sm text-gray-600">
        Total profiles in database: {totalRows}
      </div>
    </div>
  )
} 