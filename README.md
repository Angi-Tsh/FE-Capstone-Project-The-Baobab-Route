***🌍 Travel Planner: The Baobab Route***

**Project Overview**
The Baobab Route is a single-page application that connects the Amadeus API and Unsplash API to search for destinations and get information for flights, activities and realated with the Unsplash API adding photos to the interface. Built with React,and VITE to help users plan for their next trip.

Features
Destination Search: Users can search for destinations by city name.

Dynamic Data Fetching: The application fetches data from the Amadeus API and Unsplash API based on user input.

Flight Offers: Users are able to get information about upcoming flights from popular destinations and get information such us: costs (EUR), airline and duration.

State Management: Uses React hooks (useState and useEffect) to manage component state and side effects.

Reusable Components: The application is structured using reusable components like SearchBar, DestinationCard, Accommodation, Itinerary and FlightOffers to ensure a modular and scalable codebase.

Technical Stack
Frontend: React

API: Amadeus API

Styling: Tailwind CSS

Build Tool: Vite

How to Run the Project
Clone the repository:

Bash

git clone <repository-url>
cd <project-folder>
Install dependencies:

Bash

npm install
Set up the .env file:
Create a file named .env in the root of your project and add your Amadeus API credentials: key and secret.

Code snippet

VITE_AMADEUS_API_KEY="yourAPIKey"
VITE_AMADEUS_API_SECRET="yourAPISecret"
VITE_UNSPLASH_ACCESS_KEY="yourAPIKey"
VITE_UNSPLASH_ACCESS_SECRET="yourAPISecret"
Run the application:

Bash

npm run dev
The application will now be running on http://localhost:5173 (or a similar address).

**Component Breakdown**
*App.jsx:* The main component that manages the application's state,core functionalities including the search query, selected destination, itinerary creation and flight search criteria. It is the central hub rendering all components.

*SearchBar.jsx:* A simple input and button component that captures user search queries and passes them to App.jsx.

*DestinationCard.jsx:* Fetches and displays a list of destinations based on a keyword. It passes the selected destination's data (including the IATA code) back to App.jsx.

*ItineraryPlanner:* Allows users to add details (onAdd) such as activites, dates, flights and times via input fields and selection menus for their trips(s).

*FlightOffers.jsx:* Takes flight search criteria as props and makes an API call to display available flight options.

*auth.js:* A service that handles the authentication with the Amadeus API, managing the access token and its expiration.


