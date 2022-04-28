import React from "react";
import clearDay from "../../weather-animations/clearDay.mp4"; // goood
import clearNight from "../../weather-animations/clearNight.mp4";
import cloud from "../../weather-animations/cloud.mp4"; //goood
import snow from "../../weather-animations/snow.mp4";
import rain from "../../weather-animations/rain.mp4";
import stormNight from "../../weather-animations/stormNight.mp4";
import stormDay from "../../weather-animations/stormDay.mp4";
const WeatherBackground = ({ currentData }) => {
  const setBackground = () => {
    let weather = currentData.weather[0].main;

    switch (weather) {
      case "Clear":
        return clearDay;
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
        return stormNight;

      default:
        return cloud;
    }
  };
  return (
    <div>
      {currentData && (
        <video className="bg-video" autoPlay loop muted>
          <source src={setBackground()} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default WeatherBackground;
