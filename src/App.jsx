import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import DestinationCard from './components/DestinationCard';
import FlightOffers from './components/FlightOffers';
import Navigation from './components/Navigation';
import ItineraryPlanner from './components/ItineraryPlanner';
import TripDetails from './components/TripDetails';
import AccommodationOffer from './components/AccommodationForm';
import AddItemFormFlight from './components/AddItemFormFlight';
import AddItemFormAccommodation from './components/AddItemFormAccommodation';
import AddItemFormActivities from './components/AddItemFormActivities';
import Recommendations from './components/Recommendations';
import CheapestFlights from './components/CheapestFlight';
import landingPageImg from './components/LandingPageImg';

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
    console.log('Selected Destination:', destinationData.iataCode);
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
  const addAccommodation = (tripId, accommodationData) => {
    setItineraryItems (prevItems =>
      prevItems.map(trip =>
        trip.id === tripId ? {...trip,
          accommodation: [...trip.accommodation, accommodationData]} : trip)
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
      addAccommodation(tripId, itemData);
    } else if (itemType === 'activity') {
      addActivities(tripId, itemData);
    }
  };


  return (
    <div>
    <div className="">
      <Navigation className="" />
      <h2>The start of your next trip</h2>
      <Routes>
        <Route
          path="/"
          element={
            <>
            <div></div>
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
         path="/flights"
         element={
          <FlightOffers/>
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
         path="/accommodation"
         element={
          <AccommodationOffer/>
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
                selectedTrip={selectedTrip}
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
                selectedTrip={selectedTrip}
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
        <Route path="/cheapestFlights" element={<CheapestFlights />} />
      </Routes>
      <Recommendations/>    
      <landingPageImg />  
      </div>
      {/*FOOTNOTE*/}

        <div id="note-2" className="container mt-8 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
              <span className="text-blue-600 mr-1">
           <sup>2</sup>
          </span>
                  The source for this statement is from a reliable source.
          </p>
        </div>
    </div>
  );
}

export default App;