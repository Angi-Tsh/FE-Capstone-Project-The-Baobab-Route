import React, { useState } from 'react';
import { getAccessToken } from '../services/auth';

function CheapestFlights() {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [flights, setFlights] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!origin || !destination) {
            setError("Please enter both origin and destination.");
            setLoading(false);
            return;
        }

        try {
            const accessToken = await getAccessToken();
            if (!accessToken) {
                throw new Error("Authentication failed. Please check your credentials.");
            }

            const response = await fetch(
                `/api/v1/shopping/flight-dates?origin=${origin}&destination=${destination}`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.errors[0]?.detail || "Failed to fetch flight data.");
            }

            const data = await response.json();
            setFlights(data.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
                Find the Cheapest Flights
            </h2>
            <form onSubmit={handleSearch} className="flex flex-col items-center max-w-lg mx-auto mb-8">
                <input
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value.toUpperCase())}
                    placeholder="Origin (e.g., LHR)"
                    className="w-full p-3 border rounded-md mb-4"
                />
                <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value.toUpperCase())}
                    placeholder="Destination (e.g., NYC)"
                    className="w-full p-3 border rounded-md mb-4"
                />
                <button
                    type="submit"
                    className="w-full p-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition-colors"
                    disabled={loading}
                >
                    {loading ? 'Searching...' : 'Search Flights'}
                </button>
            </form>

            {error && <p className="text-red-500 text-center">{error}</p>}
            
            {flights && flights.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {flights.slice(0, 4).map((flight, index) => (
                        <div key={index} className="p-4 border rounded-lg shadow-lg">
                            <h3 className="font-bold text-lg">{flight.destination}</h3>
                            <p className="text-sm">Departure: {flight.departureDate}</p>
                            <p className="text-sm">Return: {flight.returnDate}</p>
                            <p className="text-xl font-bold text-green-600 mt-2">
                                Price: {flight.price.total} {flight.price.currency}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {flights && flights.length === 0 && (
                <p className="text-center text-gray-500">No flights found for this route.</p>
            )}
        </div>
    );
}

export default CheapestFlights;