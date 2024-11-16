import type { Response } from 'node-fetch';
import { checkRateLimit } from '../utils/rateLimit';
import type { RateLimitResponse } from '../utils/rateLimit';

interface ProfileResponse {
    // Define your expected response type here
    id: string;
    name: string;
    // ... other fields
}

export async function fetchProfile(): Promise<ProfileResponse> {
    try {
        console.log('\n📡 Fetching profile...');
        
        const response = await fetch('your-api-endpoint');
        const rateLimitStatus = checkRateLimit(response);
        
        if (rateLimitStatus.exceeded) {
            throw new Error(`Rate limit exceeded. Wait ${rateLimitStatus.waitTime} seconds.`);
        }
        
        const data = await response.json() as ProfileResponse;
        console.log('✅ Profile fetched successfully');
        return data;
        
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        console.error('❌ Error fetching profile:', errorMessage);
        throw error;
    }
}