import { checkRateLimit } from '../utils/rateLimit';

export async function fetchProfile() {
    try {
        console.log('\n📡 Fetching profile...');
        
        const response = await fetch('your-api-endpoint');
        const rateLimitStatus = checkRateLimit(response);
        
        if (rateLimitStatus.exceeded) {
            throw new Error(`Rate limit exceeded. Wait ${rateLimitStatus.waitTime} seconds.`);
        }
        
        const data = await response.json();
        console.log('✅ Profile fetched successfully');
        return data;
        
    } catch (error) {
        console.error('❌ Error fetching profile:', error.message);
        throw error;
    }
} 