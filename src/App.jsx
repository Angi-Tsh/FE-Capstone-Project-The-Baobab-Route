import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import DestinationCard from './components/DestinationCard';
import FlightOffers from './components/FlightOffers';
import Navigation from './components/Navigation';
import ItineraryPlanner from './components/ItineraryPlanner';
import TripDetails from './components/TripDetails';
import AddItemFormFlight from './components/AddItemFormFlight';
import AddItemFormAccommodation from './components/AddItemFormAccommodation';
import AddItemFormActivities from './components/AddItemFormActivities';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState(null);
  // to track the current selected trip on the itinerary page
  const [selectedTripId, setSelectedTripId] = useState(null);

  // Itinerary state management
  const [itineraryItems, setItineraryItems] = useState([]);

  // Function to add a new trip to the itinerary state
  const addToItinerary = (item) => {
    setItineraryItems((prevItems) => {
      //A new trip object with an ID
      const newTrip = {
        ...item, //to include the tripName and tripDate
        id: prevItems.length + 1, //A way to generate a new ID
        flights: [],
        accommodations: [],
        activities: [],
      };
      
      //Adding the new itinerary name and date
      const newItems = [...prevItems, newTrip];
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

  //Add a flight to a specific trip, as saved in the itinerary
  const addFlight = (tripId, flightData) => {
    setItineraryItems (prevItems => 
      prevItems.map(trip =>
        trip.id === tripId ? {...trip,
          flights: [...trip.flights, flightData]} : trip)
    );
  };

  //Add accommodation to a specific trip
  const addAccommodations = (tripId, accommodationsData) => {
    setItineraryItems (prevItems =>
      prevItems.map(trip =>
        trip.id === tripId ? {...trip,
          accommodations: [...trip.accommodations, accommodationsData]} : trip)
    );
  };

  // Find the currently selected trip object
  const selectedTrip = itineraryItems.find(trip => 
    trip.id === parseInt(selectedTripId, 10));

  //Add activities to a specific trip
  const addActivities = (tripId, activitiesData) => {
    setItineraryItems (prevItems =>
      prevItems.map(trip =>
        trip.id === tripId ? {...trip,
          activities: [...trip.activities, activitiesData]} : trip)
    );
  };
  
  // A master function to handle all item types, for use with AddItemForm
  const handleAddItem = (tripId, itemData, itemType) => {
    if (itemType === 'flight') {
      addFlight(tripId, itemData);
    } else if (itemType === 'accommodation') {
      addAccommodations(tripId, itemData);
    } else if (itemType === 'activity') {
      addActivities(tripId, itemData);
    }
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
          path="/destinations"
          element={
            <>
              <SearchBar onSearch={handleSearch} />
              {searchQuery && (
                <DestinationCard
                  keyword={searchQuery}
                  onSelect={handleSelectDestination}
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
              <AddItemFormFlight 
                onAddItem={handleAddItem} 
                trips={itineraryItems} 
                setSelectedTripId={setSelectedTripId}
              /> 
              <AddItemFormAccommodation 
                onAddItem={handleAddItem} 
                trips={itineraryItems} 
                selectedTrip={selectedTrip} 
                setSelectedTripId={setSelectedTripId}
              />
              <AddItemFormActivities 
                onAddItem={handleAddItem} 
                trips={itineraryItems} 
                setSelectedTripId={setSelectedTripId}
              />
              <div className="mt-8">
                {itineraryItems.length > 0 ? (
                  itineraryItems.map((trip) => (
                    <TripDetails key={trip.id} trip={trip} />
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