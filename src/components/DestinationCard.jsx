import { useState, useEffect } from 'react';
import getAccessToken from '../services/auth';

//1. Use useState to manage three states: DestinationData to store data fetched from API, loading to indicate if data is being fetched, and error to capture any errors during fetch.
function DestinationCard() {
    const [destinationData, setDestinationData] = useState (null);
    const [loading, setLoading] = useState (false);
    const [error, setError] = useState (null);  

    //This useEffect will handle the authentication (using tokens) and data tetching.
    useEffect (() => {
        const fetchDestinationData = async () => {
            setLoading (true);
            setError (null);
            try {
                //Get the access token first then use it to fetch data
                const accessToken = await getAccessToken ();
                if (!accessToken) {
                    throw new Error ("No access token available");  
                } 
                //Use the token to make the API request..
                const response = await fetch ('https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=PAR', {
                    headers: {
                        Authorization : `Bearer ${accessToken}`
                    },
                });

                if (!response.ok) {
                    throw new Error ("Failed to fetch destination data");
                }
                const data = await response.json();
                setDestinationData (data); 
            } catch (error) {
                console.error ("Error fetching destination data:", error);
                setError ("Failed to fetch destination data. Please try again.");   
            } finally {
                setLoading (false);
        }
        fetchDestinationData();
    }},[]); //Empty dependency array means this runs once on mount
        
    //3. Conditional rendering based on state: loading, error, and data states.
    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }
        if (!destinationData) { 
            return <p>No location data.</p>; //No data to display yet
    }
    
    return (
        <div className="destination-card sm:w-1/2 lg:w-1/3 p-4 border rounded shadow">
            <h2>{destinationData.city}</h2>
            <p>{destinationData.country}</p>
            <p>Best time to visit: {destinationData.bestTimeToVisit}</p>
            <p>Popular attractions: {destinationData.popularAttractions.join (', ')}</p>
        </div>
    );
}

export default DestinationCard;