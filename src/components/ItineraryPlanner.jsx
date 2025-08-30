import React, { useState } from 'react';

function ItineraryPlanner ({onAddItem}){
    const [tripDate, setTripDate ] = useState ('');
    const [tripName, setTripName] = useState ('');

    
    const handleSubmit = (event) =>{
        event.preventDefault (); //Prevents default from submission

        //Validate
        if (!tripName || !tripDate) {
            console.error ("Provide both a trip name and a date.")
            return;
        }

        onAddItem({
            tripName,
            tripDate,
        });

            //Reset form fields
        setTripName('');
        setTripDate('');
    };

return (
    <div>
    <h2>Create your itinerary</h2>
    <form onSubmit={handleSubmit} className="bg-purple p-8 sm:p-4 md:p-8 max-w-xs">
        <input type='text' value={tripName} 
        placeholder="Trip Name" 
        onChange={(e) => setTripName (e.target.value)}
        />
        
        <input type='text' value={tripDate} 
        placeholder="DD/MM/YYYY"
        onChange={(e) => setTripDate(e.target.value)}
        />

        <button type='submit'>Add</button>
    </form>
    <h3>Trips</h3>
    
    </div>  
);
}
export default ItineraryPlanner;