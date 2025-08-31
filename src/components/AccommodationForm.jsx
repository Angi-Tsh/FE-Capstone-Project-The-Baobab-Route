import React, { useState } from 'react';
import { getAccessToken } from '../services/auth';
//API call is triggered by the handleSearch function on form submission, not on component load, hence no useEffect.

function AccommodationOffer() {
    const [searchCriteria, setSearchCriteria] = useState({
        location: '',
        checkIn: '',
        checkout: '', 
        adults: 1,
    });
    const [accommodation, setAccommodation] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchAccommodationOffer();
    };

    const fetchAccommodationOffer = async () => {
        const { location, checkIn, checkout, adults, } = searchCriteria;

        if (!location || !checkIn || !checkout || !adults ) {
            console.error("All accommodation search criteria are required.");
            // Also, setting an error state here is a good practice for user feedback
            setError("Please fill in all search criteria.");
            return;
        }

        // Additional validation for date format
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(checkIn) || !dateRegex.test(checkout) ) {
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

            const response = await fetch(
                `/api/v2/shopping/hotel-offers?cityCode=${location}&checkInDate=${checkIn}&checkOutDate=${checkout}&adults=${adults}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to find accommodation data. Status: ${response.status}`);
            }

            const data = await response.json();
            setAccommodation(data.data);
        } catch (err) {
            console.error("Error getting accommodation offers:", err);
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
                <button type="submit">Search Accommodation</button>
            </form>

            {/* Conditional Rendering based on state */}
            {loading && <p>Just a moment, searching for accommodation...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && accommodation.length === 0 && <p>No accommodation found for your search criteria.</p>}

            {accommodation.length > 0 && (
            <div>
                <h2>Available Accommodation</h2>
                {accommodation.map((offer) => (
                     // Hotel mapping structure from Amadeus API website 
                <div key={offer.hotel.hotelId} className="accommodation-offer p-4 border rounded shadow mb-4">
                        <h3>{offer.hotel.name}</h3>
                        <p>Rating: {offer.hotel.rating}</p>
                        <p>Price: {offer.offers[0].price.total} {offer.offers[0].price.currency}</p>
                        <p>Check-in: {offer.offers[0].checkInDate}</p>
                        <p>Check-out: {offer.offers[0].checkOutDate}</p>
                        <p>Available Rooms:</p>
                    <ul>
                         {offer.offers.map((roomOffer, i) => (
                             <li key={i}>{roomOffer.room.type} - {roomOffer.room.description.text}</li>
                        ))}
                    </ul>
                </div>
                ))}
            </div>
            )}
                            
        </div>
     )};

export default AccommodationOffer;