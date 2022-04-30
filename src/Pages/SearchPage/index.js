import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import data from "../../Data/citiesList.json";
import TodayDate from "../../Components/TodayDate";
import Footer from "../../Components/Footer";
import "./style.css";
const SearchPage = ({
  city,
  setCity,
  getCurrentWeather,
  matchingCities,
  setMatchingCities,
  getWeeklyWeather,
}) => {
  let navigate = useNavigate();
  const [error, setError] = useState(false);
  const [input, setInput] = useState("");

  const getCitySuggestions = (input) => {
    let matches = [];
    if (input !== "") {
      for (let i = 0; i < data.length && matches.length < 6; i++) {
        if (data[i].name.toLowerCase().startsWith(input.toLowerCase())) {
          matches.push({
            long: data[i].lng,
            lat: data[i].lat,
            name: data[i].name,
            country: data[i].country,
          });
          setMatchingCities(matches);
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

        {matchingCities.map((item, index) => (
          <div
            className="list-item"
            onClick={() => handleClick(item.name)}
            value={item.name}
            key={item.id}
          >
            {item.name}, <span>{item.country}</span>
          </div>
        ))}
        <button className="search-button" type="button" onClick={handlSubmit}>
          Enter
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default SearchPage;
