import React, { useState, useEffect } from "react";
import data from "./Data/city2.list.json";
import axios from "axios";
import "./App.css";
import SearchBar from "./Components/SearchBar";
const App = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [input, setInput] = useState("");
  const [city, setCity] = useState("");
  const [matchesArray, setMatchesArray] = useState([]);
  const [locationData, setLocationData] = useState();
  const [coord, setCoord] = useState({
    lat: "",
    lot: "",
  });

  //get today weather info
  const getCurrentWeather = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`
      )
      .then((res) => {
        console.log(res.data);
        let respo = res.data;
        setLocationData(respo);
        setCoord((prevCoord) => {
          coord.lat = res.data.coord.lat;
          coord.lot = res.data.coord.lot;
        });
      })
      .catch((err) => console.log(err));
  };

  //get weekly weather info
  const getWeeklyWeather = () => {
    let lat = matchesArray[0].lat;
    let long = matchesArray[0].long;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,current&units=metric&appid=${apiKey}`
      )
      .then((res) => {
        console.log("werkly", res.data);
        // let respo = res.data;
        // setLocationData(respo);
        // setCoord({
        //   lat: res.data.coord.lat,
        //   lon: res.data.coord.lot,
        // });
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
        getCurrentWeather={getCurrentWeather}
        setMatchesArray={setMatchesArray}
        getWeeklyWeather={getWeeklyWeather}
        locationData={locationData}
      />

      {locationData && (
        <>
          <h1>{locationData.name}</h1>
          <h2>{Math.round(locationData.main.temp)}°C</h2>{" "}
          <h2>{locationData.weather[0].main}</h2>
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
