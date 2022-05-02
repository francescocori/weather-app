import React from "react";
import {
  clearDay,
  clearNight,
  cloud,
  snow,
  stormDay,
  stormNight,
  rain,
} from "../../weather-animations";

const WeatherBackground = ({ currentData }) => {
  const setBackground = () => {
    let weather = currentData.weather[0].main;
    let isDay = currentData.weather[0].icon.includes("d");
    switch (weather) {
      case "Clear":
        return isDay ? clearDay : clearNight;
      case "Clouds":
      case "Mist":
      case "Smoke":
      case "Haze":
      case "Fog":
      case "Ash":
        return cloud;
      case "Snow":
        return snow;
      case "Rain":
      case "Drizzle":
        return rain;

      case "Thunderstorm":
        return isDay ? stormDay : stormNight;

      default:
        return cloud;
    }
  };
  return (
    <>
      {currentData && (
        <video className="bg-video" autoPlay loop muted>
          <source src={setBackground()} type="video/mp4" />
        </video>
      )}
    </>
  );
};

export default WeatherBackground;
