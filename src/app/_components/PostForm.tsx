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
    <div className="max-w-md mx-auto p-6 bg-transparent border border-white">
      <div className="mb-4">
        <label htmlFor="profile" className="block text-sm font-mono text-white mb-2">
          Bluesky Handle
        </label>
        <input
          id="profile"
          type="text"
          value={targetProfile}
          onChange={(e) => setTargetProfile(e.target.value)}
          placeholder="e.g., username.bsky.social"
          className="w-full p-2 bg-transparent border border-white text-orangered font-mono focus:outline-none focus:border-orangered"
          disabled={isFetching}
        />
      </div>

      {error && (
        <div className="mb-4 p-3 border border-red-500 text-red-500 font-mono text-sm">
          {error}
        </div>
      )}

      <button
        onClick={handleFetchProfile}
        disabled={isFetching || !targetProfile.trim()}
        className="w-full bg-transparent border border-white text-orangered p-2 font-mono hover:bg-orangered hover:text-white disabled:opacity-50 disabled:cursor-not-allowed mb-4 transition-colors"
      >
        {isFetching ? 'Fetching Profile...' : 'Fetch Profile'}
      </button>

      {lastAddedProfile && (
        <button
          onClick={handleAnalyzeConnections}
          disabled={isAnalyzing}
          className="w-full bg-transparent border border-white text-white p-2 font-mono hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isAnalyzing ? 'Analyzing Connections...' : `Analyze ${lastAddedProfile}'s Connections`}
        </button>
      )}
    </div>
  );
} 