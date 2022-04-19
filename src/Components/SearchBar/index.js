// import React, {useState, useEffect} from 'react'

// import data from "./city2.list.json"
// import "./style.css"

// const SearchBar = ({dataFound, setDataFound, setCity, handlClick,input, setInput, city}) => {

// //   async function  searchCity(searchText) {

// //    const res = await fetch("./city2.list.json");
// //    const cities = await res.json()
// //    console.log(cities)
// //    //get matches to currents text input
// //    let matches = cities.filter(city =>{
// //     const regex= new RegExp(`^${searchText}`, "gi");
// //     return cities.name.match(regex) || cities.abbr.match(regex);
// //    })
// //    console.log(matches);
// //   }

// // searchCity(city)

// //get list for input search

// const  getCitySuggestions = (input)=>{
//     let resp = [];
//     if (input !== "") {
//       for (let i = 0 ; i < data.length && resp.length<10; i++){

//         if (data[i].name.toLowerCase().startsWith(input.toLowerCase())) {
//          resp.push({
//            id: data[i].id,
//            long: data[i].coord.lon,
//            lat: data[i].coord.lat,
//            name: data[i].name,
//            country: data[i].country,
//          });
//          setDataFound(resp)
//          console.log("yesss",resp);
//         }
//       }
//     }
//     return resp;
//   }
//   useEffect(()=>{
//    let result= getCitySuggestions(input);
//    setDataFound(result)
//    console.log("zzz",dataFound);

//   },[input])

//   const onSuggestHandler = (input) => {
//     setInput(input)
//     setDataFound([])
//   }

//   return (
//     <div>
//       <form>

//       <input
//       type="text"
//       name="search"
//       id = "search"
//       placeholder="search..."
//       onChange={(e)=>setInput(e.target.value)}
//       value={input} //??? not sure!
//       />
//       <button type="submit">search..</button>
//       </form>

//           {dataFound && dataFound.map((location)=>(
//             <h4 onClick={(e)=>onSuggestHandler(dataFound.name)}> {location.name}</h4>
//           ))}

//     </div>
//   )
// }

// export default SearchBar

import React, { useState, useEffect } from "react";
import data from "../../Data/city2.list.json";
const SearchBar = ({
  city,
  setCity,
  getWeather,
  input,
  setInput,
  matchesArray,
  setMatchesArray,
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
    </div>
  );
};

export default SearchBar;
