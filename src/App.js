import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import HomePage from "./Components/HomePage";
import MainPage from "./Components/MainPage";
const App = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [input, setInput] = useState("");
  const [city, setCity] = useState("");
  const [matchesArray, setMatchesArray] = useState([]);
  const [locationData, setLocationData] = useState();

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
      <HomePage
        input={input}
        setInput={setInput}
        city={city}
        setCity={setCity}
        matchesArray={matchesArray}
        getCurrentWeather={getCurrentWeather}
        setMatchesArray={setMatchesArray}
        getWeeklyWeather={getWeeklyWeather}
        locationData={locationData}
      />
      <MainPage locationData={locationData} />
    </div>
  );
};

export default App;
