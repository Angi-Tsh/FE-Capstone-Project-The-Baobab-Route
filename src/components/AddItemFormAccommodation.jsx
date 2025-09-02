import React, { useState } from 'react';

function AddItemFormAccommodation({ onAddItem, trips, selectedTrip, setSelectedTripId }) {
  // const [selectedTripId, setSelectedTripId] = useState(''); <--- This state is no longer needed here
  const [accName, setAccName] = useState('');
  const [checkinDate, setCheckinDate] = useState('');
  const [checkoutDate, setCheckoutDate] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedTrip || !accName || !checkinDate || !checkoutDate) {
      console.error("Please select a trip and enter all details.");
      return;
    }

    const hotelDetails = {
      name: accName,
      checkinDate,
      checkoutDate, 
    };
    
    // Call the appropriate handler from the parent component
    onAddItem(selectedTrip.id, hotelDetails, 'accommodation'); 

    // Reset form
    setAccName('');
    setCheckinDate('');
    setCheckoutDate('');
  };

  return (
    <form onSubmit={handleSubmit} >
      <h4>Add accommodation details</h4>
      {/* Update the parent's state on change */}
      <select value={selectedTrip?.id || ''} onChange={e => setSelectedTripId(e.target.value)}>
        <option value="">Select a Trip</option>
        {trips.map(trip => (
          <option key={trip.id} value={trip.id}>{trip.tripName}</option>
        ))}
      </select>
      <div className='flex flex-col md:flex-row space-between items-center p-4 bg-white border-b max-w-lg mx-auto md:space-x-4'>
      <input 
        type="text" 
        id='search'
        placeholder="Accommodation name" 
        value={accName} 
        onChange={e => setAccName(e.target.value)} 
      />
      <input 
        type="text" 
        id='search'
        placeholder="Check-in date" 
        value={checkinDate} 
        onChange={e => setCheckinDate(e.target.value)} 
            className="w-1/5 md:w-auto p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 space-y-8 space-x-8"
      />
      <input 
        type="text" 
        id='search'
        placeholder="Checkout date" 
        value={checkoutDate} 
        onChange={e => setCheckoutDate(e.target.value)} 
             className="w-1/5 md:w-auto p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 space-y-8 space-x-8"
      />

      <button id='secondaryButton' type="submit"
            className="w-1/5 md:w-auto p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 space-y-8 space-x-8"
      style={{color: '#FB8500'}}
      >
        Add Accommodation
    </button>
    </div>
      
      {selectedTrip && (
        <>
          <h4>Accommodations</h4>
          {selectedTrip.accommodations.length > 0 ? (
            <ul>
              {selectedTrip.accommodations.map((acc, index) => (
                <li key={index}>
                  {acc.name} : Check-in: {acc.checkinDate} - Checkout: {acc.checkoutDate}
                </li>
              ))}
            </ul>
          ) : (
            <p>No accommodation added yet for this trip.</p>
          )}
        </>
      )}
    </form>
  );
}

export default AddItemFormAccommodation;