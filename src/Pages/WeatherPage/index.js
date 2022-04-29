import React from "react";
import "./style.css";
import WeeklyForecastList from "../../Components/WeeklyForecastList";
import HourlyForecastList from "../../Components/HourlyForecastList";
import WeatherBackground from "../../Components/WeatherBackground";

const WeatherPage = ({ currentData, forecastData }) => {
  return (
    <div className="weather-page">
      {/* <video className="bg-video" autoPlay loop muted>
        <source src={setBackground()} type="video/mp4" />
      </video> */}
      {/* {locationData && (
        <div className="header">
          <p className="header-city">{locationData.name}</p>
          <span className="header-temperature">
            {Math.round(locationData.main.temp)}
          </span>
          <span>°C</span>

          <h4 className="header-weather">{locationData.weather[0].main}</h4>
          <img
            src={`http://openweathermap.org/img/wn/${locationData.weather[0].icon}@2x.png`}
            alt="icon"
            className="header-icon"
          />
        </div>
      )} */}
      {currentData && (
        <div className="header">
          <a href="http://localhost:3000/" className="arrowBack ">
            <span class="material-symbols-outlined">arrow_back</span>
          </a>

          <p className="header-city">{currentData.name}</p>
          <div className="header-temperature">
            {Math.round(currentData.main.temp)}°C
          </div>
          {/* <div>°C</div> */}
          <img
            src={`http://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`}
            alt="icon"
            className="header-icon"
          />

          <div className="header-weather">{currentData.weather[0].main}</div>
        </div>
      )}

      {/* ++++++++++++++ HOURLY WEATHER ++++++++++++++++++++++ */}
      <HourlyForecastList forecastData={forecastData} />
      {/* ++++++++++++++ WEEKLY WEATHER ++++++++++++++++++++++ */}
      <WeeklyForecastList forecastData={forecastData} />
      {/*++++++++++++++BACKGROUND CHANGING+++++++++++++++++++++ */}
      <WeatherBackground currentData={currentData} />
    </div>
  );
};

export default WeatherPage;
