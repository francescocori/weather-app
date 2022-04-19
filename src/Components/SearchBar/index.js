import React, { useState, useEffect } from "react";
import data from "../../Data/city2.list.json";
const SearchBar = ({
  city,
  setCity,
  getCurrentWeather,
  input,
  setInput,
  matchesArray,
  setMatchesArray,
  getWeeklyWeather,
  locationData,
}) => {
  //show only matching options
  const getCitySuggestions = (input) => {
    let matches = [];
    if (input !== "") {
      for (let i = 0; i < data.length && matches.length < 10; i++) {
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
      //   setTimeout(() => getWeeklyWeather(), 2000);
    }
  };
  return (
    <div>
      <form>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="search..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="button" onClick={handlSubmit}>
          search..
        </button>
        {matchesArray.map((item, index) => (
          <h4
            onClick={() => handleClick(item.name)}
            value={item.name}
            key={item.id}
          >
            {item.name}
          </h4>
        ))}
      </form>
    </div>
  );
};

export default SearchBar;
