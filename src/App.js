import { useState } from "react";
import "./App.css";
import HomePage from "./Components/Homepage";
import WeatherPage from "./Components/WeatherPage";

function App() {
  const apiKey = "edc98e7954f86bbfa9e8ef821e348c92";
  const [city, setCity] = useState("");
  const [data, setData] = useState([]);
  const getWeather = (e) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  };
  console.log(city);

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
      <button type="submit" onClick={getWeather}>
        search..
      </button>
    </div>
  );
}

export default App;
