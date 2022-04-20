import React from "react";

const MainPage = ({ locationData, forecastData }) => {
  return (
    <div>
      {locationData && (
        <>
          <h1>{locationData.name}</h1>
          <h2>{Math.round(locationData.main.temp)}°C</h2>{" "}
          <h2>{locationData.weather[0].main}</h2>
          <img
            src={`http://openweathermap.org/img/wn/${locationData.weather[0].icon}@2x.png`}
            alt="icon"
          />
        </>
      )}
    </div>
  );
};

export default MainPage;
