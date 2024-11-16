'use client'

import { useState, useEffect } from 'react'

interface ApiResponse {
  count: number;
}

interface ProfileResponse {
  success: boolean;
  user: {
    handle: string;
  };
  error?: string;
  details?: string;
}

interface AnalyzeResponse {
  success: boolean;
  followersAdded: number;
  followingAdded: number;
  profile: string;
  error?: string;
  details?: string;
}

export default function PostForm() {
  const [targetProfile, setTargetProfile] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState('')
  const [totalRows, setTotalRows] = useState<number>(0)
  const [lastAddedProfile, setLastAddedProfile] = useState<string | null>(null)

  const fetchTotalRows = async () => {
    try {
      const response = await fetch('/api/getUserProfile/count')
      if (!response.ok) throw new Error('Failed to fetch count')
      const data = await response.json() as ApiResponse
      setTotalRows(data.count)
    } catch (err) {
      console.error('Error fetching count:', err)
    }
  }

  useEffect(() => {
    void fetchTotalRows()
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

      const data = await response.json() as ProfileResponse
      
      if (!response.ok) {
        throw new Error(data.details ?? data.error ?? 'Failed to fetch profile')
      }

      console.log('Profile processed:', data)
      setLastAddedProfile(data.user.handle)
      setTargetProfile('')
      await fetchTotalRows()
      
    } catch (err) {
      console.error('Error:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch profile')
    } finally {
      setIsFetching(false)
    }
  }

  const handleAnalyzeConnections = async () => {
    if (!lastAddedProfile) return;
    
    setIsAnalyzing(true);
    setError('');

    try {
      const response = await fetch('/api/analyzeConnections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ handle: lastAddedProfile }),
      });

      const data = await response.json() as AnalyzeResponse;
      
      if (!response.ok) {
        throw new Error(data.details ?? data.error ?? 'Failed to analyze connections');
      }

      console.log('Connections analyzed:', data);
      await fetchTotalRows();
      
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze connections');
    } finally {
      setIsAnalyzing(false);
    }
  };

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
          placeholder="e.g., username.bsky.social"
          className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          disabled={isFetching}
        />
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded text-sm">
          {error}
        </div>
      )}

      <button
        onClick={handleFetchProfile}
        disabled={isFetching || !targetProfile.trim()}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
      >
        {isFetching ? 'Fetching Profile...' : 'Fetch Profile'}
      </button>

      {lastAddedProfile && (
        <button
          onClick={handleAnalyzeConnections}
          disabled={isAnalyzing}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? 'Analyzing Connections...' : `Analyze ${lastAddedProfile}'s Connections`}
        </button>
      )}

      <div className="mt-4 text-center text-sm text-gray-600">
        Total profiles in database: {totalRows}
      </div>
    </div>
  );
} 