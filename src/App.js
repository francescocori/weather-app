import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import HomePage from "./Components/Homepage";
import WeatherPage from "./Components/WeatherPage";

function App() {
  const apiKey = "edc98e7954f86bbfa9e8ef821e348c92";
  const [city, setCity] = useState("");
  const [data, setData] = useState();

  // see how to show daily forecast
  // https://www.youtube.com/watch?v=yna914koyQE

  //get data from API
  function getWeather() {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }

  //handle Click / Submit
  const handlClick = (e) => {
    e.preventDefault();
    getWeather();
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

      {data && <h1>{data.name}</h1>}
      {data && <h2>{Math.round(data.main.temp)}°C</h2>}
      {data && <h2>{data.weather[0].main}</h2>}
      {data && (
        <img
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt="icon"
        />
      )}
    </div>
  );
}

export default App;
