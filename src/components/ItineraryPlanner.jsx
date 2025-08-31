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
    <div className='item-center'>
    <h3>Create your itinerary</h3>
    <div>
    <form onSubmit={handleSubmit} className="flex mt-8 p-8 sm:p-4 md:p-8 max-w-xs">
        <input type='text' value={tripName} 
        placeholder="Trip Name" 
        onChange={(e) => setTripName (e.target.value)}
        className="w-full flex-1 p-3 border border-orange-300 rounded focus:ring-orange-500"

        />
        
        <input type='text' value={tripDate} 
        placeholder="DD/MM/YYYY"
        onChange={(e) => setTripDate(e.target.value)}
        className="w-1/3 flex-1 p-3 border border-orange-300 rounded focus:ring-orange-500"
        />

        <button type='submit'
        className="w-1/5 md:w-auto p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 space-y-8 space-x-8"
        >
            Add</button>
    </form>
    </div>

    </div>  
);
}
export default ItineraryPlanner;