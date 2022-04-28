import React, { useEffect } from "react";
import clear from "../../weather-animations/clear.mp4";
import cloud from "../../weather-animations/cloud4.mp4";
import fog from "../../weather-animations/fog.mp4";
import snow from "../../weather-animations/snow.mp4";
import rain from "../../weather-animations/rain.mp4";
import storm from "../../weather-animations/storm.mp4";

const WeatherBackground = ({ currentData }) => {
  const setBackground = () => {
    let weather = currentData.weather[0].main;
    switch (weather) {
      case "Clear":
        return clear;
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
      case "fog":
        return fog;
      case "Thunderstorm":
        return storm;

      default:
        return cloud;
    }
  };
  return (
    <div>
      {currentData && currentData.weather[0].main}
      {currentData && (
        <video className="bg-video" autoPlay loop muted>
          <source src={setBackground()} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default WeatherBackground;
