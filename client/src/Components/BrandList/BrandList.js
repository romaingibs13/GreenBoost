import React from "react";
import { Link } from 'react-router-dom';

function BrandList() {
  //function search(query) {
  //   return fetch(`/api/food?q=${query}`, {
  //     accept: 'application/json',
  //   }).then(checkStatus)
  //     .then(parseJSON);
  // }
  
  return (
    <div>
      <h1> The Green certified brands : </h1>
      {/* <MyBrandList /> */}
      <Link to='/'> Home </Link> 
    </div>
  );
}

export default BrandList;