import React, { useEffect } from "react";
import "./style.css";
const HourlyForecastList = ({ forecastData }) => {
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

  return <div></div>;
};

export default HourlyForecastList;
