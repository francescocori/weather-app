import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import SearchPage from "./Pages/SearchPage";
import WeatherPage from "./Pages/WeatherPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { nanoid } from "nanoid";
const App = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [city, setCity] = useState("");
  const [matchingCities, setMatchingCities] = useState([]);
  const [currentData, setCurrentData] = useState();
  const [forecastData, setForecastData] = useState({});

  const getCurrentWeather = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`
      )
      .then((res) => {
        console.log(res.data);
        let resp = res.data;
        setCurrentData(resp);
      })
      .catch((err) => console.log(err));
  };

  const getWeeklyWeather = () => {
    let lat = matchingCities[0].lat;
    let lon = matchingCities[0].long;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,current&units=metric&appid=${apiKey}`
      )
      .then((res) => {
        const utcOffset = res.data.timezone_offset;
        const hourly = res.data.hourly;
        const daily = res.data.daily;
        let hourlyReduced = hourly.map((hour) => ({
          id: nanoid(),
          temp: hour.temp,
          weatherCondition: hour.weather[0].main,
          weatherIcon: hour.weather[0].icon,
        }));
        const dailyReduced = daily.map((day) => ({
          id: nanoid(),
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
              matchingCities={matchingCities}
              getCurrentWeather={getCurrentWeather}
              setMatchingCities={setMatchingCities}
              getWeeklyWeather={getWeeklyWeather}
            />
          }
        />
        <Route
          path="/weather"
          element={
            currentData ? (
              <WeatherPage
                currentData={currentData}
                forecastData={forecastData}
              />
            ) : (
              <div id="loading"></div>
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
