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
  const [forecastData, setForecastData] = useState();
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
        console.log("a", res.data);
        console.log("b", res.data.hourly);
        console.log("c", res.data.hourly[0].weather[0].main);
        const a = res.data.hourly[0].weather[0].main;

        const resp = res.data;
        const utcOffset = res.data.timezone_offset;
        const hourly = res.data.hourly;
        const daily = res.data.daily;
        let hourlyReduced = hourly.map((hour, index) => ({
          id: index,
          temp: hour.temp,
          weatherCondition: hour.weather[0].main,
          weatherIcon: hour.weather[0].icon,
        }));
        hourlyReduced = hourlyReduced.slice(0, 24);
        const dailyReduced = daily.map((day, index) => ({
          id: index,
          minTemp: day.temp.min,
          maxTemp: day.temp.max,
          weatherCondition: day.weather[0].main,
          weatherIcon: day.weather[0].icon,
        }));
        const forecastInfo = {
          utcOffset: utcOffset,
          hourlyForecast: hourlyReduced,
          dailyForecast: dailyReduced,
        };
        console.log("F", forecastInfo);
        return forecastInfo;
      });
  };
  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  async function getWeek() {
    let lat = matchesArray[0].lat;
    let lon = matchesArray[0].long;
    const resp = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,current&units=metric&appid=${apiKey}`
    );
    const hourly = resp.data.hourly;
    const daily = resp.data.daily;
    let hourlyReduced = hourly.map((hour, index) => ({
      id: index,
      temp: hour.temp,
      weatherCondition: hour.weather[0].main,
      weatherIcon: hour.weather[0].icon,
    }));
    hourlyReduced = hourlyReduced.slice(0, 24);
    const dailyReduced = daily.map((day, index) => ({
      id: index,
      minTemp: day.temp.min,
      maxTemp: day.temp.max,
      weatherCondition: day.weather[0].main,
      weatherIcon: day.weather[0].icon,
    }));
    const forecastInfo = {
      hourlyForecast: hourlyReduced,
      dailyForecast: dailyReduced,
    };
    setForecastData(forecastInfo);
    console.log("boo", forecastData);
    return forecastInfo;
  }
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
        forecastData={forecastData}
      />
      <MainPage
        locationData={locationData}
        forecastData={forecastData}
        getWeek={getWeek}
      />
    </div>
  );
};

export default App;
