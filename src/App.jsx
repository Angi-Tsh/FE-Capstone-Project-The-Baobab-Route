import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import DestinationCard from './components/DestinationCard';
import FlightOffers from './components/FlightOffers';
import Navigation from './components/Navigation';
import ItineraryPlanner from './components/ItineraryPlanner';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState(null);

  // Itinerary state management
  const [itineraryItems, setItineraryItems] = useState([]);

  // Function to add a new item to the itinerary state
  const addToItinerary = (item) => {
    setItineraryItems((prevItems) => {
      const newItems = [...prevItems, item];
      console.log('Updated itinerary:', newItems);
      return newItems;
    });
  };

  // Flight Offers, state management
  const [flightSearchCriteria, setFlightSearchCriteria] = useState({
    departure: 'LON',
    destination: '',
    departureDate: '2025-08-30',
    adults: 1,
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log("Search query:", query);
    setSelectedDestination(null);
  };

  const handleSelectDestination = (destinationData) => {
    setSelectedDestination(destinationData);
    setFlightSearchCriteria((prev) => ({
      ...prev,
      destination: destinationData.iataCode,
    }));
  };

  return (
    <div>
      <h1>Travel Planner</h1>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SearchBar onSearch={handleSearch} />
              {searchQuery && (
                <DestinationCard
                  keyword={searchQuery}
                  onSelect={handleSelectDestination}
                />
              )}
              {selectedDestination && (
                <FlightOffers
                  departure={flightSearchCriteria.departure}
                  destination={flightSearchCriteria.destination}
                  departureDate={flightSearchCriteria.departureDate}
                  adults={flightSearchCriteria.adults}
                />
              )}
            </>
          }
        />
        <Route
          path="/itinerary"
          element={
            <>
              <ItineraryPlanner onAddItem={addToItinerary} />
              <div className="mt-8">
                {/* Check if there are items, then map and render them */}
                {itineraryItems.length > 0 ? (
                  itineraryItems.map((item, index) => (
                    <div key={index} className="p-4 border-b">
                      <h3 className="font-bold">{item.tripName}</h3>
                      <p>{item.tripDate}</p>
                    </div>
                  ))
                ) : (
                  <p>Your itinerary needs filling. Add a trip!</p>
                )}
              </div>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;