import React, { useEffect } from "react";
import "./style.css";
const WeeklyForecastList = ({ forecastData }) => {
  const dailyWeather = forecastData.dailyForecast;
  const getDays = (index) => {
    const userDate = new Date();
    const userTime = userDate.getTime();
    const localOffSet = userDate.getTimezoneOffset() * 60000;
    const utc = userTime + localOffSet;
    const cityDestionationOffSet = forecastData.utcOffset;
    const cityDestionationOffSetDate = utc + cityDestionationOffSet * 1000;
    const dateInDestinationCity = new Date(cityDestionationOffSetDate);
    const weekDayInDestinationCityQ = dateInDestinationCity.getDay();

    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let today = weekDayInDestinationCityQ;
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
    <div className="weekly-weather-container ">
      {dailyWeather && <h2 className="title">Daily Forecast</h2>}
      {dailyWeather &&
        dailyWeather.map((day, index) => (
          <div className="weekday-weather" key={index}>
            <div className="weekday">{getDays(index)}</div>
            <img
              src={`http://openweathermap.org/img/wn/${day.weatherIcon}@2x.png`}
              alt="icon"
              className="weekly-icon"
            />
            <div>{Math.round(day.minTemp)}°C</div>
            <div>{Math.round(day.maxTemp)}°C</div>
          </div>
        ))}
    </div>
  );
};

export default WeeklyForecastList;
