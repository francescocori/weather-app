import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import SearchPage from "./Pages/SearchPage";
import WeatherPage from "./Pages/WeatherPage";
const App = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [city, setCity] = useState("");
  const [matchesArray, setMatchesArray] = useState([]);
  const [locationData, setLocationData] = useState();
  const [forecastData, setForecastData] = useState({});
  //get today weather info
  const getCurrentWeather = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`
      )
      .then((res) => {
        console.log(res.data);
        let resp = res.data;
        setLocationData(resp);
      })
      .catch((err) => console.log(err));
  };

  //get weekly weather info
  const getWeeklyWeather = () => {
    let lat = matchesArray[0].lat;
    let lon = matchesArray[0].long;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,current&units=metric&appid=${apiKey}`
      )
      .then((res) => {
        const utcOffset = res.data.timezone_offset;
        const hourly = res.data.hourly;
        const daily = res.data.daily;
        let hourlyReduced = hourly.map((hour, index) => ({
          id: index,
          temp: hour.temp,
          weatherCondition: hour.weather[0].main,
          weatherIcon: hour.weather[0].icon,
        }));
        const dailyReduced = daily.map((day, index) => ({
          id: index,
          minTemp: day.temp.min,
          maxTemp: day.temp.max,
          weatherCondition: day.weather[0].main,
          weatherIcon: day.weather[0].icon,
        }));

        const forecastInfo = {
          utcOffset: utcOffset,
          hourlyForecast: hourlyReduced.slice(0, 24),
          dailyForecast: dailyReduced.slice(0, 7),
        };
        setForecastData(forecastInfo);

        return forecastInfo;
      });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <SearchPage
              city={city}
              setCity={setCity}
              matchesArray={matchesArray}
              getCurrentWeather={getCurrentWeather}
              setMatchesArray={setMatchesArray}
              getWeeklyWeather={getWeeklyWeather}
              locationData={locationData}
              forecastData={forecastData}
            />
          }
        />
        <Route
          path="/weather"
          element={
            <WeatherPage
              locationData={locationData}
              forecastData={forecastData}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
