import React from "react";
import "./style.css";
const MainPage = ({ locationData, forecastData }) => {
  return (
    <div className="weather-page">
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
      {forecastData.dailyForecast &&
        forecastData.dailyForecast.map((day, index) => (
          <div className="nextday-weather-container">
            <div className="nextday-weather">
              <img
                src={`http://openweathermap.org/img/wn/${day.weatherIcon}@2x.png`}
                alt="icon"
                className="nextday-icon"
              />
              <span>{day.minTemp}°C</span>
              <span>{day.maxTemp}°C</span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MainPage;
