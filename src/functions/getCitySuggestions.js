import suggestionList from './Data/city.list.json';
//get list for input search
const  getCitySuggestions = (city)=>{
    let resp = [];
    if (city !== "") {
      for (let i = 0 ; i < suggestionList.length && resp.length<15; i++){
        if (suggestionList[i].name.toLowerCase().startsWith(city.toLowerCase())) {
         resp.push({
           id: data[i].id,
           long: data[i].coord.lon,
           lat: data[i].coord.lat,
           name: data[i].name,
           state: data[i].state,
           country: data[i].country,
         });
        }
      }
    }
    return resp;
  }