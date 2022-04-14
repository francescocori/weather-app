import React, {useState, useEffect} from 'react'
import "./bootstrap.min.css"
import data from "./city.list.json"


const SearchBar = () => {

const [city, setCity]=useState("")
const [dataFound, setDataFound] = useState([]);

//   async function  searchCity(searchText) {

//    const res = await fetch("./city2.list.json"); 
//    const cities = await res.json()
//    console.log(cities)
//    //get matches to currents text input
//    let matches = cities.filter(city =>{
//     const regex= new RegExp(`^${searchText}`, "gi");
//     return cities.name.match(regex) || cities.abbr.match(regex);
//    })
//    console.log(matches);
//   }

// searchCity(city)


//get list for input search

const  getCitySuggestions = (city)=>{
    let resp = [];
    if (city !== "") {
      for (let i = 0 ; i < data.length && resp.length<10; i++){
      
        if (data[i].name.toLowerCase().startsWith(city.toLowerCase())) {
         resp.push({
           id: data[i].id,
           long: data[i].coord.lon,
           lat: data[i].coord.lat,
           name: data[i].name,
           country: data[i].country,
         });
         setDataFound(resp)
         console.log("yesss",resp);
        }
      }
    }
    return resp;
  }
  useEffect(()=>{
   let result= getCitySuggestions(city);
   setDataFound(result)
   console.log("zzz",dataFound);
   
  },[city])
  

  return (
    <div>
      <form>
      <input 
      type="text"
      name="search"
      id = "search"
      placeholder="search..."
      onChange={(e)=>setCity(e.target.value)}
 
      />
      <button type="submit">search..</button>
      </form>
      <h1>hello</h1>
       
          {dataFound.map((item)=>(
            <h4> {item.name}</h4>
          ))}
        
    </div>
  )
}

export default SearchBar