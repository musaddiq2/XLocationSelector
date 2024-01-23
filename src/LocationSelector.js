import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LocationSelector.css";

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [countryError, setCountryError] = useState(null);
  const [stateError, setStateError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://crio-location-selector.onrender.com/countries"
        );
        const data = await response.json(); // Parse JSON response
        setCountries(data);
        setCountryError(null); // Clear previous errors
      } catch (error) {
        console.log("fetchCountries error", error);
        setCountryError("Error fetching countries");
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = async (event) => {
    const countryName = event.target.value;
    setSelectedCountry(countryName);
    try {
      const response = await fetch(
        `https://crio-location-selector.onrender.com/country=${countryName}/states`
      );
      const data = await response.json();
      setStates(data);
      setStateError(null); // Clear previous errors
    } catch (error) {
      console.log("handleCountryChange error", error);
      setStateError("Error fetching states");
    }
  };

  const handleStateChange = async (event) => {
    const stateName = event.target.value;
    setSelectedState(stateName);
    try {
      const response = await axios.get(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${stateName}/cities`
      );
      setCities(response.data);
    } catch (error) {
      console.log("handleStateChange error", error);
      // Handle the error, display a message or set an error state if needed
    }
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <form>
      <label>
        Select Country:
        <select onChange={handleCountryChange} disabled={states.length > 0}>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {countryError && <p>{countryError}</p>}
      </label>
      <label>
        Select State:
        <select onChange={handleStateChange} disabled={cities.length > 0}>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        {stateError && <p>{stateError}</p>}
      </label>
      <label>
        Select City:
        <select onChange={handleCityChange}>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </label>
      {selectedCity && (
        <p>
          You Selected {selectedCity}, {selectedState}, {selectedCountry}
        </p>
      )}
    </form>
  );
};

export default LocationSelector;
