// AddItemFormAccommodation

import React, { useState } from 'react';

function AddItemFormActivities ({ onAddItem, trips }) {
  const [selectedTripId, setSelectedTripId] = useState('');
  const [actiName, setActiName] = useState(''); // 'flight', 'accommodation', 'activity'
  const [actiDate, setActiDate] = useState('');
  const [actiTime, setActiTime] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedTripId || !actiName || !actiDate || !actiTime) {
      console.error("Please select a trip and enter an item name.");
      return;
    }

    const activityData = {
      name: actiName,
      date: actiDate,
      time: actiTime,
    };
    
      // Call the appropriate handler from the parent component
    onAddItem(parseInt(selectedTripId, 10), activityData, 'activity'); 

    // Reset form
    setSelectedTripId('');
    setActiName('');
    setActiDate('');
    setActiTime('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h4>Add activity details</h4>
      <select value={selectedTripId} onChange={e => setSelectedTripId(e.target.value)}>
        <option value="">Select a Trip</option>
        {trips.map(trip => (
          <option key={trip.id} value={trip.id}>{trip.tripName}</option>
        ))}
      </select>
      
      <input 
        type="text" 
        placeholder="e.g Add the day's activity" 
        value={actiName} 
        onChange={e => setActiName(e.target.value)} 
      />

      <input 
        type="text" 
        placeholder="e.g Date of activity" 
        value={actiDate} 
        onChange={e => setActiDate(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="e.g Starting time" 
        value={actiTime} 
        onChange={e => setActiTime(e.target.value)} 
      />
      
      <button type="submit">Add Activity</button>
    </form>
  );
}

export default AddItemFormActivities;