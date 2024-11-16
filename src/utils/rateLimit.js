export function checkRateLimit(response) {
    const limit = response.headers.get('X-RateLimit-Limit');
    const remaining = response.headers.get('X-RateLimit-Remaining');
    const resetTime = response.headers.get('X-RateLimit-Reset');
    
    console.log('\n=== Rate Limit Status ===');
    console.log(`Total Limit: ${limit}`);
    console.log(`Remaining Calls: ${remaining}`);
    
    if (remaining <= 0) {
        const now = Date.now() / 1000;
        const waitTime = resetTime - now;
        
        console.log('\n⚠️  RATE LIMIT EXCEEDED!');
        console.log(`Wait Time: ${Math.ceil(waitTime)} seconds`);
        console.log(`Reset Time: ${new Date(resetTime * 1000).toLocaleTimeString()}`);
        
        return {
            exceeded: true,
            waitTime: Math.ceil(waitTime),
            limit,
            remaining
        };
    }
    
    return {
        exceeded: false,
        remaining,
        limit
    };
} 