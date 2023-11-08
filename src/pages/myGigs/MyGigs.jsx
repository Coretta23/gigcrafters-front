import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MyGigs.scss";
import axios from "axios";

function MyGigs() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [products, setProducts]= useState([]);
  useEffect(()=> {
        if (currentUser?.user?.role !== "marchand") {
          navigate("/")
        }

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

  function onDeleteProduct() {
    console.log("click")
    async function fetchData(url, method) {
      try {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            method: method
        });

        const data = await response.json();
        setData(data)

        // if(data?.status === 200) {
        //     navigate("/myGigs")
        // } else {
        //     console.log("Register Error :", data);
        // }
      } catch (error) {
          setError(true);
          console.log("Register Error :", error);
      } finally {
          setIsLoading(false);
      }
    };

    fetchData("http://127.0.0.1:8000/api/products", "DELETE");
  }

  return (
    <div className="myGigs">
      <div className="container">
        <div className="title">
          <h1>{currentUser.isSeller ? "Gigs" : "Orders"}</h1>
          {currentUser?.user?.role === "marchand" && (
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
            <th onClick={onDeleteProduct}>Delete</th>
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
