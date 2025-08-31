import React, { useState } from 'react';

//The search bar component allows users to search with keywords by passing the input to the App.jsx parent component which will then pass it down to DestinationCard.jsx to fetch data from the Amadeus API.

function SearchBar ({onSearch}){
    const [searchText, setSearchText] = useState(``);

    const handleSearch = () => {
        //Call the onSearch prop function passing the search text to the parent 
            onSearch(searchText);
        };
    
    return (
        <div className="flex flex-row md:flex-row space-between items-center p-4 bg-white rounded-full max-w-lg mx-auto md:space-x-4">
            <input type="text" 
            id='search'
            placeholder='Search for a city...' 
            className='w-1/3 p-3 mt-8 border items-center rounded-full text-lg mb-4 md:mb-0 text-gray-700' 
            value={searchText}
            onChange={
                (e) => setSearchText(e.target.value)
            }/>
            <button
            className='md:w-auto p-3 font-semibold border border-orange-500 shadow bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors'
            onClick={handleSearch}>
                Search
            </button>
        </div>
    );
}

export default SearchBar;