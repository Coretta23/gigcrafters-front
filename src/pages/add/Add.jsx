import React, { useEffect, useState } from "react";
import "./Add.scss";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/navbar/loader/Loader";

function Add  () {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const categoryCoresp = ["design", "web", "animation", "music"]

  const [inputData, setInputData] = useState({});

  useEffect(() => {
    if (currentUser?.user?.role !== "marchand") {
      navigate("/")
    }
  }, []);

  const handleInputChange = (e) =>{
    const name = e.target.name;
    const value = e.target.value

    setInputData({
      ...inputData,
      [name]: value
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    categoryCoresp.forEach((cat, index) => {
      if (cat === inputData?.category) {
        inputData.category = index;
      }
    })
    
    console.log("inuput data :", inputData?.category);
    
    async function fetchData(url, subData, method) {
      try {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            method: method,
            body: JSON.stringify(subData)
        });

        const data = await response.json();
        setData(data)

        if(data?.status === 200) {
            navigate("/myGigs")
        } else {
            console.log("Register Error :", data);
        }
      } catch (error) {
          setError(true);
          console.log("Register Error :", error);
      } finally {
          setIsLoading(false);
      }
    };

    fetchData("http://127.0.0.1:8000/api/products", inputData, "POST");
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Title</label>
            <input
              name="name"
              type="text"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleInputChange}
            />

            <label htmlFor="">Category</label>
            <select name="category" id="cats" onChange={handleInputChange}>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>

            <label htmlFor="">Cover Image</label>
            <input name="coverimage" type="file" onChange={handleInputChange} />

            <label htmlFor="">Description</label>
            <textarea name="description" id="" placeholder="Brief descriptions to introduce your service to customers" cols="0" rows="16" onChange={handleInputChange}></textarea>

            <button
              onClick={handleSubmit}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 20
              }}
            >
              {isLoading && <Loader />}
              Create
            </button>
          </div>
          <div className="details">
            <textarea name="shortdescription" id="" placeholder="Short description of your service" cols="30" rows="10" onChange={handleInputChange}></textarea>
            <label htmlFor="">Price</label>
            <input name="price" type="number" onChange={handleInputChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
