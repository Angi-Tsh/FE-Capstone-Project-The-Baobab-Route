
//Create a function to get the access token from Amadeus API, CALL this funtion whenever you need the token.
const getAccessToken = async () => {
  const apiKey = import.meta.env.jAaVbm88PSDv0wEa55wCjG1C3akvFUVc;
  const apiSecret = import.meta.env.sKMj8IObGTQN0Pam;
  //HIDE THIS FILE IN a .env file and add to THE gitignore FILE TO PROTECT YOUR API KEYS

  const authURL = "https://test.api.amadeus.com/v1/security/oauth2/token";
  const data = new URLSearchParams();
  data.append("grant_type", "client_credentials");  
  data.append("client_id", jAaVbm88PSDv0wEa55wCjG1C3akvFUVc);
  data.append("client_secret", sKMj8IObGTQN0Pam);

  try { 
    const response = await fetch(authURL,{
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: data
        });
        if (!response.ok) {
            throw new Error("Failed to fetch access token");
        }   
        const tokenData = await response.json();
        return tokenData.access_token;  
    } catch (error) {
        console.error("Error fetching access token:", error);
        throw error;
    } return null;
}; 

export default getAccessToken;