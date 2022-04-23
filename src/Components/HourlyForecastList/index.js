import React, { useEffect } from "react";
import "./style.css";
const HourlyForecastList = ({ forecastData }) => {
  const hourlyWeather = forecastData.hourlyForecast;

  const ved = (index) => {
    const userDate = new Date();
    const userTime = userDate.getTime();
    const localOffSet = userDate.getTimezoneOffset() * 60000;
    const utc = userTime + localOffSet;
    const cityDestionationOffSet = forecastData.utcOffset;
    const cityDestionationOffSetTime = utc + cityDestionationOffSet * 1000;
    const timeInDestinationCity = new Date(cityDestionationOffSetTime);
    const hourInDestinationCity = timeInDestinationCity.getHours();
    let forecastTime = hourInDestinationCity + index;
    console.log("hourInDestinationCity", hourInDestinationCity);
    // if (index === 0) {
    //   return "NOW";
    // }
    // if (timeForecast > 24) {
    //   return `0${timeForecast - 24}:00`;
    // }

    // if (timeForecast === 24) {
    //   return "00:00";
    // }
    // if (timeForecast <= 12) {
    //   return `${timeForecast}:00`;
    // } else return `${timeForecast}:00`;
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

  /// ora che hai calcolato questo lo devi usare below per far vedere la corretta ora es. now | 10am | 11 am | 12 pm ecc
  return (
    <div className="hourly-container">
      {hourlyWeather &&
        hourlyWeather.map((hour, index) => (
          <div className="hour-weather">
            <span>{ved(index)}</span>
            <img
              src={`http://openweathermap.org/img/wn/${hour.weatherIcon}@2x.png`}
              alt="icon"
              className="nextday-icon"
            />
            <span>{Math.round(hour.temp)}°C</span>
            <span>{hour.weatherCondition}</span>
          </div>
        ))}
    </div>
  );
};

export default HourlyForecastList;
