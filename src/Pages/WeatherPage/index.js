import React from "react";
import "./style.css";
import WeeklyForecastList from "../../Components/WeeklyForecastList";
import HourlyForecastList from "../../Components/HourlyForecastList";
import clear from "../../weather-animations/clear.mp4";
import cloud from "../../weather-animations/cloud4.mp4";
import fog from "../../weather-animations/fog.mp4";
import snow from "../../weather-animations/snow.mp4";
import rain from "../../weather-animations/rain.mp4";
import storm from "../../weather-animations/storm.mp4";

const WeatherPage = ({ locationData, forecastData }) => {
  // const setBackground = () => {
  //   let a = locationData.weather[0].main;
  //   switch (a) {
  //     case "clear":
  //       return clear;
  //     case "clouds":
  //       return cloud;
  //     case "snow":
  //       return snow;
  //     case "rain":
  //       return rain;
  //     case "fog":
  //       return fog;
  //     case "thunderstorm":
  //       return storm;

  //     default:
  //       return cloud;
  //   }
  // };

  return (
    <div className="weather-page">
      {/* <video className="bg-video" autoPlay loop muted>
        <source src={setBackground()} type="video/mp4" />
      </video> */}
      {locationData && (
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
      )}

      {/* ++++++++++++++ HOURLY WEATHER ++++++++++++++++++++++ */}
      <HourlyForecastList forecastData={forecastData} />
      {/* ++++++++++++++ WEEKLY WEATHER ++++++++++++++++++++++ */}
      <WeeklyForecastList forecastData={forecastData} />
    </div>
  );
};

export default WeatherPage;
