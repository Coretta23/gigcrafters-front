import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MyGigs.scss";
import axios from "axios";

function MyGigs() {
  const currentUser = {
    id: 1,
    username: "Anna",
    isSeller: true,
  };
  const [products, setProducts]= useState([]);
  useEffect(()=> {
        axios.get("http://127.0.0.1:8000/api/products").then(res => {
        console.log(res)   
        setProducts(res.data.products);
        })
  },[])
    var productDetails ="";
productDetails = products.map((item, index)=>{
  return(
    <tr key={index}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.about}</td>
      <td>{item.basicprice}</td>
      
      <td><button>EDIT</button></td>
      <td><button className="btn">DELETE</button></td>
    </tr>
  );
});

  return (
    <div className="myGigs">
      <div className="container">
        <div className="title">
          <h1>{currentUser.isSeller ? "Gigs" : "Orders"}</h1>
          {currentUser.isSeller && (
            <Link to="/add">
              <button>Add New Gig</button>
            </Link>
          )}
        </div>
        <table>
          <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>About</th>
            <th> Price</th>
            
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          </thead>
          <tbody>
            {productDetails}
          </tbody>
         
        </table>
      </div>
    </div>
  );
}

export default MyGigs;
