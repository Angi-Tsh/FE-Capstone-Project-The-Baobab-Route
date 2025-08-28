import React, { useState } from 'react'
import DestinationCard from './components/DestinationCard';


function App() {
  const [origin, setOrigin] = useState(``);
  const [destination, setDestination] = useState(``);

  return (
          <div>
        <DestinationCard handleChoice = {setOrigin} display = {"origin"}/>
        <DestinationCard handleChoice = {setDestination} display = {"destination"}/>
      </div>
  )
}

export default App;
