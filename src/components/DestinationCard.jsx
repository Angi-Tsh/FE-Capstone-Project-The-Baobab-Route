import { useState, useEffect } from 'react';
import { getAccessToken } from '../services/auth';

//1. Use useState to manage three states: DestinationData to store data fetched from API, loading to indicate if data is being fetched, and error to capture any errors during fetch.
function DestinationCard({ keyword, onSelect }) { // user input props from parent component (App.jsx)
    const [destinationData, setDestinationData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);  
    
    console.log(keyword)

    //This useEffect will handle the authentication (using tokens) and data fetching.
    useEffect(() => {
        if (!keyword) return; //Do nothing if no keyword provided

        //2. Fetch data from Amadeus API using the access token obtained from getAccessToken function.
        const fetchDestinationData = async () => {
            setLoading(true);
            setError(null);
            try {
                //Get the access token first then use it to fetch data
                const accessToken = await getAccessToken();

                if (!accessToken) {
                    throw new Error("Access token not available");
                }

                //Use the token to make the API request.
                const response = await fetch(`api/v1/reference-data/locations?keyword=${keyword}&subType=CITY`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch destination data. Status: " + response.status);
                }

                const data = await response.json();
                console.log(data);
                setDestinationData(data.data); // Correctly set the `data` array from the API response.
            } catch (error) {
                setError("Failed to fetch destination data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchDestinationData();
    }, [keyword]); //When keyword changes (user input), re-run the effect
    
    //3. Conditional rendering based on state: loading, error, and data states.
    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }
    if (!destinationData || destinationData.length === 0) {
        return <p>No location data.</p>; //No data to display yet
    }
    
    return (
        <div className="destination-card sm:w-1/2 lg:w-1/3 p-4 border rounded shadow">
            <h2>{keyword}</h2>
            <ul>
                {destinationData.map((loc) => (
                    // On click, call the `onSelect` prop with the selected location data
                    <li key={loc.id} onClick={() => onSelect(loc)}>
                        {loc.name} , {loc.address.countryName}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DestinationCard;