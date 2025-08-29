import React, { useEffect, useState } from 'react';
import getAccessToken from '../services/auth';

function FlightOffers({ departure, destination, departureDate, adults }) {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Ensure required props are available before fetching
        if (!departure || !destination || !departureDate || !adults) {
            return;
        }

        const fetchFlightOffers = async () => {
            setLoading(true);
            setError(null);
            try {
                // Get access token
                const accessToken = await getAccessToken();
                if (!accessToken) {
                    throw new Error("Access token not available");
                }
                
                const response = await fetch(
                    `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${departure}&destinationLocationCode=${destination}&departureDate=${departureDate}&adults=${adults}`,
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

        fetchFlightOffers();
    }, [departure, destination, departureDate, adults]);

    // Conditional Rendering based on state
    if (loading) {
        return <p>Just a moment, searching for flights...</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }
    if (!flights || flights.length === 0) {
        return <p>No flights found for your search criteria.</p>;
    }

    return (
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
    );
}

export default FlightOffers;