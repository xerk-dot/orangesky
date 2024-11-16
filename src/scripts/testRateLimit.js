import { checkRateLimit } from '../utils/rateLimit';

async function testApiCall() {
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
        
        // Optional: log the response data
        const data = await response.json();
        console.log('\nResponse Data:', data);
        
    } catch (error) {
        console.error('\n❌ Error:', error.message);
    }
}

// Run the test
testApiCall(); 