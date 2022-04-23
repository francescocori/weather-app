import React, { useEffect } from "react";
import "./style.css";
const WeeklyForecastList = ({ forecastData }) => {
  const userDate = new Date();
  const userTime = userDate.getTime();
  const localOffSet = userDate.getTimezoneOffset() * 60000;
  const utc = userTime + localOffSet;
  const cityDestionationOffSet = forecastData.utcOffset;
  const cityDestionationOffSetDate = utc + cityDestionationOffSet * 1000;
  const dateInDestinationCity = new Date(cityDestionationOffSetDate);
  const weekDayInDestinationCityQ = dateInDestinationCity.getDay();
  console.log(weekDayInDestinationCityQ);

  // rivedi come usare il calcolo fatto sopra per fare il display dei giorni sotto

  const dailyWeather = forecastData.dailyForecast;
  const getDays = (index) => {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let date = new Date();
    let today = date.getDay();
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
    <div>
      {dailyWeather &&
        dailyWeather.map((day, index) => (
          <div className="nextday-weather-container">
            <div className="nextday-weather" key={index}>
              <span className="nextday-name">
                {getDays(index) === 3 ? "Today" : getDays(index)}
              </span>
              <img
                src={`http://openweathermap.org/img/wn/${day.weatherIcon}@2x.png`}
                alt="icon"
                className="nextday-icon"
              />
              <span>{Math.round(day.minTemp)}°C</span>
              <span>{Math.round(day.maxTemp)}°C</span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default WeeklyForecastList;
