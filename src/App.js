import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import WeatherPage from "./Components/WeatherPage";
import SearchBar from "./Components/SearchBar";
import SearchBarN from "./Components/SeatchBarN";

function App() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [city, setCity] = useState(""); //text inside the input
  const [data, setData] = useState(); // all city list
  const [choosed, setChoosed] = useState();
  const [input, setInput] = useState("");
  const [coord, setCoord] = useState({
    lon: 0,
    lan: 0,
  });
  const [dataFound, setDataFound] = useState([]);

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
  };

  //handle Click / Submit
  const handlSubmit = (e) => {
    console.log("city is", city);
    // setCity(city);
    getWeather();
    // setCity("");
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

  const getCitySuggestions = (input) => {
    let resp = [];
    if (input !== "") {
      for (let i = 0; i < data.length && resp.length < 10; i++) {
        if (data[i].name.toLowerCase().startsWith(input.toLowerCase())) {
          resp.push({
            id: data[i].id,
            long: data[i].coord.lon,
            lat: data[i].coord.lat,
            name: data[i].name,
            country: data[i].country,
          });
          setDataFound(resp);
          console.log("yesss", resp);
        }
      }
    }
    return resp;
  };
  useEffect(() => {
    getCitySuggestions(input);
    // setDataFound(result);
  }, [input]);

  return (
    <div className="App">
      <SearchBarN handlSubmit={handlSubmit} city={city} />
      <SearchBar
        getWeather={getWeather}
        dataFound={dataFound}
        setDataFound={setDataFound}
        setCity={setCity}
        handlSubmit={handlSubmit}
        input={input}
        setInput={setInput}
        city={city}
      />
      {/* +++++++++++++ ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}

      <form onSubmit={handlSubmit}>
        <input
          type="text"
          name="cit"
          onChange={(e) => setCity(e.target.value)}
          value={city}
        ></input>
        <button type="submit">search..</button>
      </form>
      <br />
      <h1>{dateBuilder(new Date())}</h1>

      {data && (
        <>
          <h1>{data.name}</h1>
          <h2>{Math.round(data.main.temp)}°C</h2>{" "}
          <h2>{data.weather[0].main}</h2>
          <img
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt="icon"
          />
          <h3>Lon:{data.coord.lon}</h3>
          <h3>Lat:{data.coord.lat}</h3>
        </>
      )}
    </div>
  );
}

export default App;

// return (
//   <div className="App">

// {/* <SearchBar
// dataFound={dataFound}
// setDataFound={setDataFound}
// setCity={setCity}
// handlClick={handlClick}
// input={input}
// setInput={setInput}
// city={city}
// /> */}
//     {/* +++++++++++++ ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}

//      <form onSubmit={handlClick}>
//       <input
//         type="text"
//         name="cit"
//         onChange={(e) => setCity(e.target.value)}
//         value={city}
//         ///not working
//       ></input>
//       <button type="submit">search..</button>
//     </form>
//     <br />
//     <h1>{dateBuilder(new Date())}</h1>

//     {data && (
//       <>
//         <h1>{data.name}</h1>
//         <h2>{Math.round(data.main.temp)}°C</h2>{" "}
//         <h2>{data.weather[0].main}</h2>
//         <img
//           src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
//           alt="icon"
//         />
//         <h3>Lon:{coord.lon}</h3>
//         <h3>Lat:{data.coord.lat}</h3>
//       </>
//     )}
//   </div>
// );
// }

// export default App;
