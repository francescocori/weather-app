// import React, {useState, useEffect} from "react";
// import axios from "axios";
// import "./style.css";
// import data from "./city2.list.json"
// const WeatherPage = () => {
// const [users, setUsers] = useState(data)
// const [text, setText] = useState()
// const [suggestions, setSuggestions]= useState()

// const onChangeHandler = (text)=>{
//   let matches = [];

//   if (text.length > 0) {
//     for (let i = 0 ; i < users.length && matches.length<10; i++){
    
//       if (data[i].name.toLowerCase().startsWith(text.toLowerCase())) {
//        matches.push({
//          id: data[i].id,
//          long: data[i].coord.lon,
//          lat: data[i].coord.lat,
//          name: data[i].name,
//          country: data[i].country,
//        });
      
//       }
//     }
    
//   }
//   return matches;
//   setSuggestions(matches)
//   setText(text)
//   console.log(matches);


// }

//   return <div>
//     <input type="text"
//     onChange={(e)=>onChangeHandler(e.target.value)}
//     value={text}
//     />
    
//   </div>;
// };

// export default WeatherPage;
