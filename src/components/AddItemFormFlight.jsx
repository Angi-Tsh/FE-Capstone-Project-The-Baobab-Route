//AddItemFormFlight
import React, { useState } from 'react';

function AddItemFormFlight({ onAddItem, trips }) {
  const [selectedTripId, setSelectedTripId] = useState('');
  const [airlineName, setAirlineName] = useState(''); // 'flight', 'accommodation', 'activity'
  const [departureAirport, setDepartureAirport] = useState('');
  const [arrivalAirport, setArrivalAirport] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedTripId || !airlineName || !departureAirport || !arrivalAirport) {
      console.error("Please select a trip and enter an item name.");
      return;
    }

    const flightDetails = {
      airlineName,
      departureAirport,
      arrivalAirport,
    };
    
      // Call the appropriate handler from the parent component
    onAddItem(parseInt(selectedTripId, 10), flightDetails, 'flight'); 

    // Reset form fields
    setSelectedTripId('');
    setDepartureAirport ('');
    setArrivalAirport('');
    setAirlineName('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h4>Add flight details</h4>
      <select value={selectedTripId} onChange={e => setSelectedTripId(e.target.value)}>
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
        placeholder="e.g. Daparture airport" 
        value={departureAirport} 
        onChange={e => setDepartureAirport(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="e.g. Arrival airport" 
        value={arrivalAirport} 
        onChange={e => setArrivalAirport(e.target.value)} 
      />
      
      <button type="submit">Add Item</button>
    </form>
  );
}

export default AddItemFormFlight;