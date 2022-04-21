import React from "react";
import "./style.css";
const MainPage = ({ locationData, forecastData }) => {
  const getDays = (index) => {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let date = new Date();
    let today = date.getDay();
    let daysRearrange = [];

    for (let i = today; i < days.length; i++) {
      daysRearrange.push(days[i]);
    }
    for (let j = 0; j < days.length; j++) {
      daysRearrange.push(days[j]);
    }

    return daysRearrange[index];
  };

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
      {/* ++++++++++++++ WEEKLY WEATHER ++++++++++++++++++++++ */}
      {forecastData.dailyForecast &&
        forecastData.dailyForecast.map((day, index) => (
          <div className="nextday-weather-container">
            <div className="nextday-weather" key={index}>
              <span className="nextday-name">
                {getDays(index) === 3 ? "Today" : getDays(index)}
              </span>
              <img
                src={`http://openweathermap.org/img/wn/${day.weatherIcon}@2x.png`}
                alt="icon"
                className="nextday-icon"
              />
              <span>{Math.round(day.minTemp)}°C</span>
              <span>{Math.round(day.maxTemp)}°C</span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MainPage;
