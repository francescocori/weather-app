import React, { useState, useEffect } from "react";
import data from "./Data/city2.list.json";
import axios from "axios";
import "./App.css";
import SearchBar from "./Components/SearchBar";
const App = () => {
  const [input, setInput] = useState("");
  const [matchesArray, setMatchesArray] = useState([]);
  const [city, setCity] = useState("");
  const [locationData, setLocationData] = useState();
  const apiKey = process.env.REACT_APP_API_KEY;

  //get weather info
  const getWeather = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`
      )
      .then((res) => {
        console.log(res.data);
        let respo = res.data;
        setLocationData(respo);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <SearchBar
        input={input}
        setInput={setInput}
        matchesArray={matchesArray}
        city={city}
        setCity={setCity}
        getWeather={getWeather}
        setMatchesArray={setMatchesArray}
      />

      {locationData && (
        <>
          <h1>{locationData.name}</h1>
          <h2>{Math.round(locationData.main.temp)}°C</h2>{" "}
          <h2>{locationData.weather[0].description}</h2>
          <img
            src={`http://openweathermap.org/img/wn/${locationData.weather[0].icon}@2x.png`}
            alt="icon"
          />
          <h3>Lon:{locationData.coord.lon}</h3>
          <h3>Lat:{locationData.coord.lat}</h3>
        </>
      )}
    </div>
  );
};

export default App;
