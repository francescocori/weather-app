import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import HomePage from "./Components/Homepage";
import WeatherPage from "./Components/WeatherPage";

function App() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [city, setCity] = useState("");
  const [data, setData] = useState();
  const [weeklyData, setWeeklyData] = useState();

  const [coord, setCoord] = useState({
    lon: 0,
    lan: 0,
  });

  // see how to show daily forecast
  // https://www.youtube.com/watch?v=yna914koyQE

  //get data from API
  const getWeather = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
    setCoord({
      lon: data.coord.lon,
      lan: data.coord.lan,
    });
  };
  //get weeeekly forecast

  const getWeeklyForecast = (coord) => {
    let lat = coord.lat;
    let lon = coord.lon;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,current&units=metric&appid=${apiKey}`
      )
      .then((res) => {
        console.log(res.data);
        setWeeklyData(res.data);
        console.log("weekly", res.data);
      });
  };

  //handle Click / Submit
  const handlClick = (e) => {
    e.preventDefault();
    getWeather();
    getWeeklyForecast();
    setCity("");
  };
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

  return (
    <div className="App">
      <form onSubmit={handlClick}>
        <input
          type="text"
          name="cit"
          onChange={(e) => setCity(e.target.value)}
          value={city}
          ///not working
        ></input>
        <button type="submit">search..</button>
      </form>
      <br />
      <h1>{dateBuilder(new Date())}</h1>
      {/* {today} */}

      {data && (
        <>
          <h1>{data.name}</h1>
          <h2>{Math.round(data.main.temp)}°C</h2>{" "}
          <h2>{data.weather[0].main}</h2>
          <img
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt="icon"
          />
          <h3>Lon:{coord.lon}</h3>
          <h3>Lat:{data.coord.lat}</h3>
        </>
      )}
    </div>
  );
}

export default App;
