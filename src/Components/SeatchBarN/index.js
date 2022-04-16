
import React from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import data from "./city2.list.json"
const SearchBarN = ({handlClick, city}) => {
  


  const formatResult = (item) => {
    return (
      <>
        <span > {item.name}</span>
      </>
    )
  }

  return (
//     <form onSubmit={handlClick}>
//     <input
//       type="text"
//       name="cit"
//       onChange={(e) => setCity(e.target.value)}
//       value={city}
//       ///not working
//     ></input>
//     <button type="submit">search..</button>
//   </form>
  
     
    <form onSubmit={handlClick}>
        <div style={{ width: 400 }}>
          <ReactSearchAutocomplete
            items={data}
            autoFocus
            formatResult={formatResult}
            value={data.name}
          />
          <button type="submit" >search..</button>
        </div>
        
  </form>
  
  )
}

export default SearchBarN;