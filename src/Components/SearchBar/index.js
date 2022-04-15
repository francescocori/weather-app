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

import React, {useState, useEffect} from 'react'
import data from "./city2.list.json"


const SearchBar = () => {

const [input, setInput]=useState("")
const [dataFound, setDataFound] = useState([]);
const [city, setCity] = useState()


const  getCitySuggestions = (input)=>{
    let resp = [];
    if (input !== "") {
      for (let i = 0 ; i < data.length && resp.length<10; i++){
      
        if (data[i].name.toLowerCase().startsWith(input.toLowerCase())) {
         resp.push({
           id: data[i].id,
           long: data[i].coord.lon,
           lat: data[i].coord.lat,
           name: data[i].name,
           country: data[i].country,
         });
         setDataFound(resp)
       
        }
      }
    }
    return resp;
  }
  useEffect(()=>{
   let result= getCitySuggestions(input);
   setDataFound(result)

   
  },[input])
  
  const handlClick = (e)=>{
    e.preventDefault()
    setCity(e.target.value)
    console.log(city);
  }
console.log(" city is..",city);
  return (
    <div>
      <form>
      <input 
      type="text"
      name="search"
      id = "search"
      placeholder="search..."
      onChange={(e)=>setInput(e.target.value)}
 
      />
      <button type="submit">search..</button>
      {dataFound.map((item,index)=>(
            <h4 onClick={(e)=>setCity(e.target.value) } value={item.name} key={index}> {item.name}</h4>
          ))}


      
      </form>
    
       
         
        
    </div>
  )
}

export default SearchBar