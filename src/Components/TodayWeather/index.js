import React from "react";
import "./style.css";
const TodayWeather = ({ currentData }) => {
  return (
    <div>
      {currentData && (
        <div className="header">
          <a href="http://localhost:3000/" className="arrowBack ">
            <span className="material-symbols-outlined">arrow_back</span>
          </a>
          <p className="header-city">{currentData.name}</p>
          <div className="header-temperature">
            {Math.round(currentData.main.temp)}°C
          </div>
          <img
            src={`http://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`}
            alt="icon"
            className="header-icon"
          />
          <div className="header-weather">{currentData.weather[0].main}</div>
        </div>
      )}
    </div>
  );
};

export default TodayWeather;
