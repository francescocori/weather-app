import React, { useEffect } from "react";
import "./style.css";
const HourlyForecastList = ({ forecastData }) => {
  const hourlyWeather = forecastData.hourlyForecast;
  useEffect(() => {
    console.log("cc", forecastData);
    const userDate = new Date();
    const userTime = userDate.getTime();
    const localOffSet = userDate.getTimezoneOffset() * 60000;
    const utc = userTime + localOffSet;
    const cityDestionationOffSet = forecastData.utcOffset;
    const cityDestionationOffSetTime = utc + cityDestionationOffSet * 1000;
    const timeInDestinationCity = new Date(cityDestionationOffSetTime);
    const hourInDestinationCity = timeInDestinationCity.getHours();
    console.log("hourInDestinationCity", hourInDestinationCity);
  }, [forecastData]);

  return (
    <div className="hourly-container">
      {hourlyWeather &&
        hourlyWeather.map((hour) => (
          <div className="hour-weather">
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
