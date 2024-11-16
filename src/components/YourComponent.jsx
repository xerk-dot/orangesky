import { fetchProfile } from '../services/api';

// In your component:
const handleFetchProfile = async () => {
    try {
        const data = await fetchProfile();
        // Handle successful response
    } catch (error) {
        if (error.message.includes('Rate limit exceeded')) {
            // Show user-friendly message about rate limit
            alert(error.message);
        } else {
            // Handle other errors
            console.error(error);
        }
    }
}; 