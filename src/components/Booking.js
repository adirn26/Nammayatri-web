import React, { useEffect } from 'react'
import OfferList from './OfferList';
import axios from 'axios';
import { useState } from 'react';

const staticBooking = [{ "name": "Ramesh", "timeAway": 10, "offerPrice": 70, "ratings": 4.0 , "lat": 13.074796409338758 , "lon": 77.56879850534327}, { "name": "Ganesh", "timeAway": 3, "offerPrice": 80, "ratings": 4.2, "lat": 13.074796409338758 , "lon": 77.56879850534327 }]


function Booking() {
  const [booking, setBooking] = React.useState(staticBooking);
  const [showoffers, setShowOffers] = React.useState(false);
  const [currentLocation, setCurrentLocation] = React.useState('');
  const [destination, setDestination] = React.useState('');
  const [query, setQuery] = useState('');
  const [destinationQuery, setDestinationQuery] = useState('')
  const [results, setResults] = useState([]);
  const [destinationResults, setDestinationResults] = useState([]);

  const handleSearch = () => {
    // setCurrentLocation(document.getElementById('currentLocation').value);
    // setDestination(document.getElementById('destination').value);
    // if (currentLocation && destination) {
    //     setShowOffers(true);
    // }
    setShowOffers(true);
  }

  const handleChange = (event) => {
    setQuery(event.target.value)
    if (event.target.value.length > 2) {
      axios.get(`https://nominatim.openstreetmap.org/search?q=${event.target.value}&format=json&city=Banglore&state=karnataka&country=India`)
        .then(response => setResults(response.data))
        .catch(error => console.log(error));
    }
  };

  const handleDestinationChange = (event) => {
    setDestinationQuery(event.target.value)
    if (event.target.value.length > 2) {
      axios.get(`https://nominatim.openstreetmap.org/search?q=${event.target.value}&format=json&city=Banglore&state=karnataka&country=India`)
        .then(response => setDestinationResults(response.data))
        .catch(error => console.log(error));
    }
  };

  const handleCurrentLocationSuggestionClick = (suggestion) => {
    setCurrentLocation(suggestion);
    setQuery(suggestion.display_name)
    setResults([])
    console.log(`Current Location: ${suggestion.display_name}`)
  }

  const handleDestinationSuggestionClick = (suggestion) => {
    setDestination(suggestion);
    setDestinationQuery(suggestion.display_name)
    setDestinationResults([])
    console.log(`Destination: ${suggestion.display_name}`)
  }

  useEffect (() => {

  }, [results]);

  return (
    <div className="container my-5">
      <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
        <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
          {!showoffers ?
            <h1 className="display-4 fw-bold lh-1 text-warning">Book a ride with us!</h1>
            : null
          }
          <div className="container-flex d-flex mt-5">
            <div className="row g-3">
              <div className="col-auto">
                <input type="text" id="currentLocation" className="form-control" placeholder='Current Location' value={query} onChange={handleChange} />
                <ul className='list-group'>
                  {results.map((suggestion) => (
                    <li className='list-group-item' key={suggestion.place_id} onClick={() => handleCurrentLocationSuggestionClick(suggestion)}>
                    <div  style={{ cursor: 'default', ':hover': { cursor: 'pointer' } }}> {suggestion.display_name} </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-auto">
                <input type="text" id="destination" className="form-control" placeholder='Destination' value={destinationQuery} onChange={handleDestinationChange} />
                <ul className='list-group'>
                  {destinationResults.map((suggestion) => (
                    <li className='list-group-item' key={suggestion.place_id} onClick={() => handleDestinationSuggestionClick(suggestion)}>
                    <div  style={{ cursor: 'default', ':hover': { cursor: 'pointer' } }}> {suggestion.display_name} </div>
                  </li>
                  ))}
                </ul>
              </div>
              <div className="col-auto">
                <button type="submit" className="btn btn-outline-warning mb-3" onClick={handleSearch}>Search</button>
              </div>
            </div>
          </div>
          {showoffers ? <OfferList booking={booking} currentLocation={currentLocation} destination={destination} /> : null
          }
        </div>
      </div>
    </div>

  )
}

export default Booking