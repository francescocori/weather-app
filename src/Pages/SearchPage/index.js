import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import data from "../../Data/city2.list.json";
import TodayDate from "../../Components/TodayDate";
import "./style.css";
const SearchPage = ({
  city,
  setCity,
  getCurrentWeather,
  input,
  setInput,
  matchesArray,
  setMatchesArray,
  getWeeklyWeather,
}) => {
  let navigate = useNavigate();
  const [error, setError] = useState(false);

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
      navigate("/weather");
    }
    setError(true);
  };
  return (
    <div className="searchPage-body">
      {error ? (
        <div className="error-message">Please enter a city name</div>
      ) : (
        ""
      )}

      <h1 className="searchPage-header">
        Tell us where
        <br /> and we will tell you the weather...
      </h1>

      <TodayDate />
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

export default SearchPage;