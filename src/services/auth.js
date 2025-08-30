import axios from 'axios'; 

// Use a cache to store the token
let accessToken = null;
let tokenExpiry = 0;

// Remember tokens have an expiry time, check if valid
export const getAccessToken = async () => {
    if (accessToken && Date.now() < tokenExpiry){
        return accessToken;
    }

    // Create a function to get the access token from Amadeus API, CALL this funtion whenever you need the token.
    const apiKey = import.meta.env.VITE_AMADEUS_API_KEY; 
    const apiSecret = import.meta.env.VITE_AMADEUS_API_SECRET;

    if (!apiKey || !apiSecret) {
        console.error("API keys are missing.");
        throw new Error("API keys not configured.");
    }

    const authURL = "https://test.api.amadeus.com/v1/security/oauth2/token";
    const data = new URLSearchParams();
    data.append("grant_type", "client_credentials");
    data.append("client_id", apiKey);
    data.append("client_secret", apiSecret);

    try { 
        
        const response = await fetch(authURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: data 
        });

        if (!response.ok) {
            throw new Error("Failed to fetch access token");
        }

        const tokenData = await response.json(); // Use .json() on a fetch response
        accessToken = tokenData.access_token; 
        tokenExpiry = Date.now() + (tokenData.expires_in - 60) * 1000;
        // Set to expire before the actual expiration.
        return accessToken;
    } catch (error) {
        console.error("Error fetching access token:", error);
        throw error;
    } 
}; 

