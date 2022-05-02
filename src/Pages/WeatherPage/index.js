import React from "react";
import "./style.css";
import WeeklyForecast from "../../Components/WeeklyForecast";
import HourlyForecast from "../../Components/HourlyForecast";
import BackgroundVideo from "../../Components/BackgroundVideo";
import TodayWeather from "../../Components/TodayWeather";

const WeatherPage = ({ currentData, forecastData }) => {
  return (
    <div className="weather-page">
      <TodayWeather currentData={currentData} />
      <div className="forecast">
        <HourlyForecast forecastData={forecastData} />

        <WeeklyForecast forecastData={forecastData} />
      </div>

      <BackgroundVideo currentData={currentData} />
    </div>
  );
};

export default WeatherPage;
