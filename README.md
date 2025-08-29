🌍 Travel Planner: The Baobab Route
Project Overview
The Baobab Route is a single-page application that connects the Amadeus API to search for destinations and get information for flights, activities and realated. Built with React to help users plan for their next trip.

Features
Destination Search: Users can search for destinations by city name and/or country name.

Dynamic Data Fetching: The application fetches data from the Amadeus API based on user input.

Flight Offers: Displays available flight offers for a selected destination.

State Management: Uses React hooks (useState and useEffect) to manage component state and side effects.

Reusable Components: The application is structured using reusable components like SearchBar, DestinationCard, and FlightOffers to ensure a modular and scalable codebase.

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

VITE_AMADEUS_API_KEY="your_api_key"
VITE_AMADEUS_API_SECRET="your_api_secret"
Run the application:

Bash

npm run dev
The application will now be running on http://localhost:5173 (or a similar address).

Component Breakdown
App.jsx: The main component that manages the application's state, including the search query, selected destination, and flight search criteria. It is the central hub that renders all other components.

SearchBar.jsx: A simple input and button component that captures user search queries and passes them to App.jsx.

DestinationCard.jsx: Fetches and displays a list of destinations based on a keyword. It passes the selected destination's data (including the IATA code) back to App.jsx.

FlightOffers.jsx: Takes flight search criteria as props and makes an API call to display available flight options.

auth.js: A service that handles the authentication with the Amadeus API, managing the access token and its expiration.


