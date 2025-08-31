import React, { useState } from 'react';
import { getAccessToken } from '../services/auth';
import AccommodationOffer from './AccommodationOffer';

function HotelSearch() {
    const [searchCriteria, setSearchCriteria] = useState({
        location: '',
        checkIn: '',
        checkout: '',
        adults: 1,
    });
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchHotelsByCity();
    };

    const fetchHotelsByCity = async () => {
        const { location, checkIn, checkout, adults } = searchCriteria;

        if (!location || !checkIn || !checkout || !adults) {
            setError("Please fill in all search criteria.");
            return;
        }

        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(checkIn) || !dateRegex.test(checkout)) {
            setError("Date must be in YYYY-MM-DD format.");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const accessToken = await getAccessToken();
            if (!accessToken) {
                throw new Error("Access token not available");
            }

            // Corrected API call to get hotel IDs for a city
            const response = await fetch(
                `/api/v3/reference-data/locations/hotels/by-city?cityCode=${location}&checkInDate=${checkIn}&checkOutDate=${checkout}&adults=${adults}`,
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
            setHotels(data.data); // Set the list of hotels
        } catch (err) {
            console.error("Error getting hotels:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Find Accommodation</h2>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Location"
                    value={searchCriteria.location}
                    onChange={e => setSearchCriteria({ ...searchCriteria, location: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="Check-in Date"
                    value={searchCriteria.checkIn}
                    onChange={e => setSearchCriteria({ ...searchCriteria, checkIn: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="Checkout Date"
                    value={searchCriteria.checkout}
                    onChange={e => setSearchCriteria({ ...searchCriteria, checkout: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Adults"
                    value={searchCriteria.adults}
                    onChange={e => setSearchCriteria({ ...searchCriteria, adults: e.target.value })}
                />
                <button type="submit">Search Hotels</button>
            </form>

            {loading && <p>Just a moment, searching for hotels...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && hotels.length === 0 && <p>No hotels found for your search criteria.</p>}

            {hotels.length > 0 && (
                <AccommodationOffer hotels={hotels} searchCriteria={searchCriteria} />
            )}
        </div>
    );
}

export default HotelSearch;