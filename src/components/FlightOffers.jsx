import React, { useEffect, useState } from 'react';
import { getAccessToken } from '../services/auth';

function FlightOffers() {
    const [searchCriteria, setSearchCriteria] = useState({
        departure: '',
        destination: '',
        departureDate: '', 
        adults: 1,
    });
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchFlightOffers();
    };

    const fetchFlightOffers = async () => {
        const { departure, destination, departureDate, adults } = searchCriteria;

        if (!departure || !destination || !departureDate || !adults) {
            console.error("All flight search criteria are required.");
            // Also, setting an error state here is a good practice for user feedback
            setError("Please fill in all search criteria.");
            return;
        }

        // Additional validation for date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(departureDate)) {
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
                `/api/v2/shopping/flight-offers?originLocationCode=${departure}&destinationLocationCode=${destination}&departureDate=${departureDate}&adults=${adults}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to find flight data. Status: ${response.status}`);
            }

            const data = await response.json();
            setFlights(data.data);
        } catch (err) {
            console.error("Error getting flight offers:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Find Flights</h2>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Departure Airport"
                    value={searchCriteria.departure}
                    onChange={e => setSearchCriteria({ ...searchCriteria, departure: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Destination Airport"
                    value={searchCriteria.destination}
                    onChange={e => setSearchCriteria({ ...searchCriteria, destination: e.target.value })}
                />
                <input
                    type="date"
                    value={searchCriteria.departureDate}
                    onChange={e => setSearchCriteria({ ...searchCriteria, departureDate: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Adults"
                    value={searchCriteria.adults}
                    onChange={e => setSearchCriteria({ ...searchCriteria, adults: e.target.value })}
                />
                <button type="submit">Search Flights</button>
            </form>

            {/* Conditional Rendering based on state */}
            {loading && <p>Just a moment, searching for flights...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && flights.length === 0 && <p>No flights found for your search criteria.</p>}

            {flights.length > 0 && (
                <div>
                    <h2>Available flights</h2>
                    {flights.map((offer, index) => (
                        <div key={index} className="flight-offer p-4 border rounded shadow mb-4">
                            <h3>Price: {offer.price.total} {offer.price.currency}</h3>
                            {offer.itineraries.map((itinerary, i) => (
                                <div key={i}>
                                    <p>Duration of flight: {itinerary.duration}</p>
                                    {itinerary.segments.map((segment, j) => (
                                        <div key={j} className="segment-details ml-4">
                                            <p>
                                                {segment.departure.iataCode} to {segment.arrival.iataCode}
                                            </p>
                                            <p>
                                                Carrier: {segment.carrierCode}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default FlightOffers;