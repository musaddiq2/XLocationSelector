import React, { useState } from 'react';

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    fetchStates(e.target.value);
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    fetchCities(selectedCountry, e.target.value);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const fetchCountries = async () => {
    const response = await fetch('https://crio-location-selector.onrender.com/countries');
    const data = await response.json();
    setCountries(data);
    setSelectedCountry(data[0]);
    fetchStates(data[0]);
  };

  const fetchStates = async (country) => {
    const response = await fetch(`https://crio-location-selector.onrender.com/country/${country}/states`);
    const data = await response.json();
    setStates(data);
    setSelectedState(data[0]);
    fetchCities(country, data[0]);
  };

  const fetchCities = async (country, state) => {
    const response = await fetch(`https://crio-location-selector.onrender.com/country/${country}/state/${state}/cities`);
    const data = await response.json();
    setCities(data);
    setSelectedCity(data[0]);
  };

  return (
    <div>
      <select onChange={handleCountryChange}>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      <select disabled={!selectedCountry} onChange={handleStateChange}>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
      <select disabled={!selectedState} onChange={handleCityChange}>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      {selectedCity && <p>You Selected {selectedCity}, {selectedState}, {selectedCountry}</p>}
    </div>
  );
};

export default LocationSelector;