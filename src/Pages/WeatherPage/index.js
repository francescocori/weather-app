import React from "react";
import "./style.css";
import WeeklyForecastList from "../../Components/WeeklyForecastList";
import HourlyForecastList from "../../Components/HourlyForecastList";
const WeatherPage = ({ locationData, forecastData }) => {
  return (
    <div className="weather-page">
      {/* ++++++++++++++ CURRENT WEATHER ++++++++++++++++++++++ */}
      {locationData && (
        <>
          <h1>{locationData.name}</h1>
          <h2>{Math.round(locationData.main.temp)}°C</h2>{" "}
          <h2>{locationData.weather[0].main}</h2>
          <img
            src={`http://openweathermap.org/img/wn/${locationData.weather[0].icon}@2x.png`}
            alt="icon"
          />
        </>
      )}

      {/* ++++++++++++++ HOURLY WEATHER ++++++++++++++++++++++ */}
      <HourlyForecastList forecastData={forecastData} />
      {/* ++++++++++++++ WEEKLY WEATHER ++++++++++++++++++++++ */}
      <WeeklyForecastList forecastData={forecastData} />
    </div>
  );
};

export default WeatherPage;
