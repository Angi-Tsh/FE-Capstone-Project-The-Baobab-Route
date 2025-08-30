// AddItemFormFlight
import React, { useState } from 'react';

function AddItemFormFlight({ onAddItem, trips, selectedTrip, setSelectedTripId }) {
    // State to manage form inputs
    const [airlineName, setAirlineName] = useState('');
    const [departureAirport, setDepartureAirport] = useState('');
    const [arrivalAirport, setArrivalAirport] = useState('');

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Use optional chaining to safely check if a trip is selected
        if (!selectedTrip?.id || !airlineName || !departureAirport || !arrivalAirport) {
            console.error("Please select a trip and fill in all flight details.");
            return;
        }

        const flightDetails = {
            airlineName,
            departureAirport,
            arrivalAirport,
        };
        
        // Call the master handler with the trip ID and item data
        onAddItem(selectedTrip.id, flightDetails, 'flight'); 

        // Reset form fields
        setAirlineName('');
        setDepartureAirport('');
        setArrivalAirport('');
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded">
            <h4>Add flight details</h4>
            {/* Update the parent's state on change */}
            <select value={selectedTrip?.id || ''} onChange={e => setSelectedTripId(e.target.value)}>
                <option value="">Select a Trip</option>
                {trips.map(trip => (
                    <option key={trip.id} value={trip.id}>{trip.tripName}</option>
                ))}
            </select>
            
            <input 
                type="text" 
                placeholder="e.g. Airline name" 
                value={airlineName} 
                onChange={e => setAirlineName(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="e.g. Departure airport" 
                value={departureAirport} 
                onChange={e => setDepartureAirport(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="e.g. Arrival airport" 
                value={arrivalAirport} 
                onChange={e => setArrivalAirport(e.target.value)} 
            />
            
            <button type="submit">Add Flight</button>
            
            {/* Display the list of flights for the selected trip */}
            {selectedTrip && (
                <>
                    <h4>Flights</h4>
                    {selectedTrip.flights.length > 0 ? (
                        <ul>
                            {selectedTrip.flights.map((flight, index) => (
                                <li key={index}>
                                    {flight.airlineName} from {flight.departureAirport} to {flight.arrivalAirport}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No flights added yet for this trip.</p>
                    )}
                </>
            )}
        </form>
    );
}

export default AddItemFormFlight;