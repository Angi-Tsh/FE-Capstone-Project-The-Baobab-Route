import React, { useState } from 'react';
import { getAccessToken } from '../services/auth';
//API call is triggered by the handleSearch function on form submission, not on component load, hence no useEffect.

function AccommodationOffer() {
    const [searchCriteria, setSearchCriteria] = useState({
        location: '',
    });
    // Renamed state variable to be more accurate to the API results
    const [hotels, setHotels] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        // Renamed function to be more accurate to the API call
        fetchHotels();
    };

    const fetchHotels = async () => {
        const { location } = searchCriteria;

        if (!location) {
            console.error("All accommodation search criteria are required.");
            // Also, setting an error state here is a good practice for user feedback
            setError("Please fill in the location field.");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const accessToken = await getAccessToken();
            if (!accessToken) {
                throw new Error("Access token not available");
            }

            // The API endpoint was changed from hotel-offers to hotel-search
            const response = await fetch(
                `/api/v1/shopping/hotel-search?cityCode=${location}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to find hotel data. Status: ${response.status}`);
            }

            const data = await response.json();
            // The API response for hotel-search is different, so we set 'hotels'
            setHotels(data.data || []);
        } catch (err) {
            console.error("Error getting hotel data:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">Find Accommodation</h3>
            <div className="text-center">
            <form onSubmit={handleSearch} className="flex flex-col text-2xl md:text-3xl font-bold mb-6 text-center">
                <input
                    type="text"
                    id='search'
                    placeholder="Location"
                    value={searchCriteria.location}
                    className=" p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 space-y-8 space-x-8"
                    onChange={e => setSearchCriteria({ ...searchCriteria, location: e.target.value })}
                />
                <button type="submit" className="w-1/5 md:w-auto p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 space-y-8 space-x-8">Search Accommodation</button>
            </form>
            </div>

            {/* Conditional Rendering based on state */}
            {loading && <p>Just a moment, searching for accommodation...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && hotels.length === 0 && <p>No accommodation found for your search criteria.</p>}

            {hotels.length > 0 && (
                <div>
                    <h2>Available Accommodation</h2>
                    {hotels.map((hotel) => (
                        <div key={hotel.hotelId} className="accommodation-offer p-4 border rounded shadow mb-4">
                            {/* The hotel-search API returns limited info, so we can only display name and rating */}
                            <h3>{hotel.name}</h3>
                            {hotel.rating && <p>Rating: {hotel.rating}</p>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AccommodationOffer;