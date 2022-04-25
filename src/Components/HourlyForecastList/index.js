import React, { useEffect } from "react";
import "./style.css";
const HourlyForecastList = ({ forecastData }) => {
  const hourlyWeather = forecastData.hourlyForecast;

  const hoursForecast = (index) => {
    const userDate = new Date();
    const userTime = userDate.getTime();
    const localOffSet = userDate.getTimezoneOffset() * 60000;
    const utc = userTime + localOffSet;
    const cityDestionationOffSet = forecastData.utcOffset;
    const cityDestionationOffSetTime = utc + cityDestionationOffSet * 1000;
    const timeInDestinationCity = new Date(cityDestionationOffSetTime);
    const hourInDestinationCity = timeInDestinationCity.getHours();
    let forecastTime = hourInDestinationCity + index;

    if (index === 0) {
      return "NOW";
    }
    if (forecastTime > 24) {
      forecastTime = forecastTime - 24;
    }

    if (forecastTime === 24) {
      forecastTime = forecastTime - 12;
      return forecastTime + "AM";
    } else if (forecastTime > 12) {
      forecastTime = forecastTime - 12;
      return forecastTime + "PM";
    } else if (forecastTime === 12) {
      return forecastTime + "PM";
    } else {
      return forecastTime + "AM";
    }
  };

  return (
    <div className="hourly-container">
      {hourlyWeather &&
        hourlyWeather.map((hour, index) => (
          <div className="hour-weather" key={index}>
            <span>{hoursForecast(index)}</span>
            <img
              src={`http://openweathermap.org/img/wn/${hour.weatherIcon}@2x.png`}
              alt="icon"
              className="nextday-icon"
            />
            <span>{Math.round(hour.temp)}°</span>
            <span>{hour.weatherCondition}</span>
          </div>
        ))}
    </div>
  );
};

export default HourlyForecastList;
