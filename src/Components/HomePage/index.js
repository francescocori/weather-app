import React, { useState, useEffect } from "react";
import data from "../../Data/city2.list.json";
import "./style.css";
const HomePage = ({
  city,
  setCity,
  getCurrentWeather,
  input,
  setInput,
  matchesArray,
  setMatchesArray,
  getWeeklyWeather,
  locationData,
  forecastData,
  getWeek,
}) => {
  // create date of today
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  //show only matching options
  const getCitySuggestions = (input) => {
    let matches = [];
    if (input !== "") {
      for (let i = 0; i < data.length && matches.length < 6; i++) {
        if (data[i].name.toLowerCase().startsWith(input.toLowerCase())) {
          matches.push({
            id: data[i].id,
            long: data[i].coord.lon,
            lat: data[i].coord.lat,
            name: data[i].name,
            country: data[i].country,
          });
          setMatchesArray(matches);
        }
      }
    }
    return matches;
  };

  //call function every time user type
  useEffect(() => {
    getCitySuggestions(input);
  }, [input]);

  // handle when user click on city
  const handleClick = (cityName) => {
    setCity((prev) => cityName);
    setInput((prev) => cityName);
  };

  //handle Click / Submit
  const handlSubmit = (e) => {
    if (city !== "") {
      getCurrentWeather();
      setInput("");
      getWeeklyWeather();
      console.log("try", forecastData);
    }
  };
  return (
    <div className="homepage">
      <h3>think mobile first</h3>
      <h1 className="header">
        Tell us where
        <br /> and we will tell you the weather...
      </h1>
      <h3 className="current-date">{dateBuilder(new Date())}</h3>

      <form>
        <div className="input-container">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Type to Search..."
            value={input}
            className="searchbar"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        {matchesArray.map((item, index) => (
          <div
            className="list-item"
            onClick={() => handleClick(item.name)}
            value={item.name}
            key={item.id}
          >
            {item.name}
          </div>
        ))}
        <button className="button" type="button" onClick={handlSubmit}>
          Enter
        </button>
      </form>
    </div>
  );
};

export default HomePage;
