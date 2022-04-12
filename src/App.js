import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import HomePage from "./Components/Homepage";
import WeatherPage from "./Components/WeatherPage";

function App() {
  const apiKey = "edc98e7954f86bbfa9e8ef821e348c92";
  const [city, setCity] = useState("");
  const [data, setData] = useState();

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
  const handlClick = () => {
    getWeather();
    setCity("");
  };
  // const getWeather = (e) => {
  //   fetch(
  //     `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setData(data);
  //       console.log(data);
  //       console.log(data.main.temp);
  //     });
  // };

  //axios get data from Api

  return (
    <div className="App">
      hello world
      <form>
        <input
          type="text"
          name="cit"
          onChange={(e) => setCity(e.target.value)}
          value={city}
        ></input>
      </form>
      <button type="submit" onClick={handlClick}>
        search..
      </button>
      {data && <h1>{data.main.temp}</h1>}
      {data && <h1>{data.weather[0].main}</h1>}
      <img
        src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
      />
    </div>
  );
}

export default App;
