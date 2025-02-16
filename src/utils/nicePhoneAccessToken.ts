const NICE_CLIENT_ID = process.env.NICE_CLIENT_ID;
const NICE_CLIENT_SECRET = process.env.NICE_CLIENT_SECRET;
const NICE_HOST = "https://svc.niceapi.co.kr:22001"
const TOKEN_URL = "/digital/niceid/oauth/oauth/token"
const REQUEST_URL = "/digital/niceid/api/v1.0/common/crypto/token"

// Cache implementation
let tokenCache = {
    token: null,
    timestamp: 0
};

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export async function getNicePhoneAccessToken() {
    // Check if we have a valid cached token
    const now = Date.now();
    if (tokenCache.token && (now - tokenCache.timestamp) < CACHE_DURATION) {
        return tokenCache.token;
    }

    const response = await fetch(`${NICE_HOST}${TOKEN_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${Buffer.from(`${NICE_CLIENT_ID}:${NICE_CLIENT_SECRET}`).toString('base64')}`
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            scope: 'default'
        })
    });

    const data = await response.json();
    
    // Update cache
    tokenCache = {
        token: data,
        timestamp: now
    };

    return data;
}