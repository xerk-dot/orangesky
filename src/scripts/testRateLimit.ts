import { type Response } from 'node-fetch';
import { checkRateLimit } from '../utils/rateLimit';

async function testApiCall(): Promise<void> {
    try {
        const response = await fetch('your-api-endpoint');
        const rateLimitStatus = checkRateLimit(response);
        
        if (rateLimitStatus.exceeded) {
            console.log('\n❌ Request failed due to rate limit');
            console.log(`Please wait ${rateLimitStatus.waitTime} seconds before trying again`);
        } else {
            console.log('\n✅ Request successful');
            console.log(`Remaining calls: ${rateLimitStatus.remaining}/${rateLimitStatus.limit}`);
        }
        
        const data = await response.json() as Record<string, unknown>;
        console.log('\nResponse Data:', data);
        
    } catch (error) {
        console.error('\n❌ Error:', error instanceof Error ? error.message : String(error));
    }
}

// Run the test
void testApiCall(); 