// AddItemFormActivities
import React, { useState } from 'react';
import PhotoDisplay from '../assets/PhotoDisplay';

function AddItemFormActivities({ onAddItem, trips, selectedTrip, setSelectedTripId }) {
    // State to manage form inputs
    const [activityName, setActivityName] = useState('');
    const [activityDate, setActivityDate] = useState('');
    const [activityTime, setActivityTime] = useState('');

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Use optional chaining to safely check if a trip is selected
        if (!selectedTrip?.id || !activityName || !activityDate || !activityTime) {
            console.error("Please select a trip and fill in all activity details.");
            return;
        }

        const activityData = {
            name: activityName,
            date: activityDate,
            time: activityTime,
        };
        
        // Call the master handler with the trip ID and item data
        onAddItem(selectedTrip.id, activityData, 'activity'); 

        // Reset form fields
        setActivityName('');
        setActivityDate('');
        setActivityTime('');
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 ">
            <h4>Add activity details</h4>
            {/* Update the parent's state on change */}
            <select value={selectedTrip?.id || ''} onChange={e => setSelectedTripId(e.target.value)}>
                <option value="">Select a Trip</option>
                {trips.map(trip => (
                    <option key={trip.id} value={trip.id}>{trip.tripName}</option>
                ))}
            </select>
            
            <input 
                type="text" 
                placeholder="e.g. Add the day's activity" 
                value={activityName} 
                onChange={e => setActivityName(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="e.g. Date of activity" 
                value={activityDate} 
                onChange={e => setActivityDate(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="e.g. Starting time" 
                value={activityTime} 
                onChange={e => setActivityTime(e.target.value)} 
            />
            
            <button type="submit">Add Activity</button>
            <PhotoDisplay query={activityName} />

            
            {/* Display the list of activities for the selected trip */}
            {selectedTrip && (
                <>
                    <h4>Activities</h4>
                    {selectedTrip.activities.length > 0 ? (
                        <ul>
                            {selectedTrip.activities.map((activity, index) => (
                                <li key={index}>
                                    {activity.name} on {activity.date} at {activity.time}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No activities added yet for this trip.</p>
                    )}
                </>
            )}
        </form>
    );
}

export default AddItemFormActivities;