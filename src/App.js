import React, { useState, useEffect } from "react";
import data from "./Data/city2.list.json";
import axios from "axios";
const App = () => {
  const [input, setInput] = useState("");
  const [matchesArray, setMatchesArray] = useState([]);
  const [city, setCity] = useState("");
  const [locationData, setLocationData] = useState();
  const apiKey = process.env.REACT_APP_API_KEY;

  //get weather info
  const getWeather = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`
      )
      .then((res) => {
        console.log(res.data);
        let respo = res.data;
        setLocationData(respo);
      })
      .catch((err) => console.log(err));
  };

  //filter suggestions
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
      getWeather();
    }
    console.log("city is", city);
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

      {locationData && (
        <>
          <h1>{locationData.name}</h1>
          <h2>{Math.round(locationData.main.temp)}°C</h2>{" "}
          <h2>{locationData.weather[0].description}</h2>
          <img
            src={`http://openweathermap.org/img/wn/${locationData.weather[0].icon}@2x.png`}
            alt="icon"
          />
          <h3>Lon:{locationData.coord.lon}</h3>
          <h3>Lat:{locationData.coord.lat}</h3>
        </>
      )}
    </div>
  );
};

export default App;
