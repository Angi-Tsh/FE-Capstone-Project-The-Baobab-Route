import React, { useState } from 'react';
import DestinationCard from './components/DestinationCard';
import SearchBar from './components/SearchBar';
import FlightOffers from './components/FlightOffers';

function App() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

//SearchBar component to capture user input and pass it to DestinationCard component to fetch data from Amadeus API
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log("Search query:", query); //the query will be used to trigger an API call in DestinationCard component
    // Clear previously selected destination on a new search
    setSelectedDestination(null);
  };

  //Flight Offers, state management 
  const [flightSearchCriteria, setFlightSearchCriteria] = useState({
    departure: 'LON',
    destination: '',
    departureDate: '2025-08-30',
    adults: 1,
  });

  const handleSelectDestination = (destinationData) => {
   
    setSelectedDestination(destinationData);
    setFlightSearchCriteria((prev) => ({
      ...prev,
      destination: destinationData.iataCode, //iatat is the assigned code for airports, e.g KIX, JNB,HND etc.
    }));
  };

  return (
    <div>
      <h1>Travel Planner</h1>
      <SearchBar onSearch={handleSearch} />
      
      {/* Conditionally render search results if a query is present */}
      {searchQuery && (
        <DestinationCard 
          keyword={searchQuery} 
          onSelect={handleSelectDestination} 
        />
      )}

      {/* Conditionally render the FlightOffers component only if a destination is selected */}
      {selectedDestination && (
        <FlightOffers
          departure={flightSearchCriteria.departure}
          destination={flightSearchCriteria.destination}
          departureDate={flightSearchCriteria.departureDate}
          adults={flightSearchCriteria.adults}
        />
      )}

    </div>
  );
}

export default App;