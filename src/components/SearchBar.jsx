import React, { useState } from 'react';

//The search bar component allows users to search with keywords by passing the input to the App.jsx parent component which will then pass it down to DestinationCard.jsx to fetch data from the Amadeus API.

function SearchBar ({onSearch}){
    const [searchText, setSearchText] = useState(``);

    const handleSearch = () => {
        //Call the onSearch prop function passing the search text to the parent 
            onSearch(searchText);
        };
    
    return (
        <div className="search-bar p-4 border-b">
            <input type="text" placeholder='Search for a city, activtiy...' className='w-full p-2 border rounded' 
            value={searchText}
            onChange={
                (e) => setSearchText(e.target.value)
            }/>
            <button className='mt-2 p-2 border-b bg-blue-500 text-white rounded'
            onClick={handleSearch}>
                Search
            </button>
        </div>
    );
}

export default SearchBar;