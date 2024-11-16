export interface RateLimitResponse {
  exceeded: boolean;
  waitTime?: number;
  limit?: string | null;
  remaining?: string | null;
}

export function checkRateLimit(response: Response): RateLimitResponse {
    const limit = response.headers.get('X-RateLimit-Limit');
    const remaining = response.headers.get('X-RateLimit-Remaining');
    const resetTime = response.headers.get('X-RateLimit-Reset');
    
    console.log('\n=== Rate Limit Status ===');
    console.log(`Total Limit: ${limit}`);
    console.log(`Remaining Calls: ${remaining}`);
    
    if (remaining && parseInt(remaining) <= 0 && resetTime) {
        const now = Date.now() / 1000;
        const waitTime = parseInt(resetTime) - now;
        
        console.log('\n⚠️  RATE LIMIT EXCEEDED!');
        console.log(`Wait Time: ${Math.ceil(waitTime)} seconds`);
        console.log(`Reset Time: ${new Date(parseInt(resetTime) * 1000).toLocaleTimeString()}`);
        
        return {
            exceeded: true,
            waitTime: Math.ceil(waitTime),
            limit,
            remaining
        };
    }
    
    return {
        exceeded: false,
        limit,
        remaining
    };
} 