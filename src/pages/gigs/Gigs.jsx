
import React, {useEffect, useRef, useState}  from "react";
import { gigs } from "../data";
import GigCard from "../../components/navbar/gigCard/GigCard";
import "./Gigs.scss"
import { useContext } from "react";
import { AppContext } from "../../utils/context";

function Gigs() {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({});
    const [sort, setSort] = useState("sales");
    const [open, setOpen] = useState(false);
    const { loggedUser } = useContext(AppContext);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const minRef = useRef();
    const maxRef = useRef();
    let newdata;
  
    const reSort = (type) => {
      setSort(type);
      setOpen(false);
    };

    useEffect(() => {
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
  
          if(data?.status !== 200) {
            console.log("Register Error :", data);
          }
        } catch (error) {
            setError(true);
            console.log("Register Error :", error);
        } finally {
            setIsLoading(false);
        }
      };
  
      fetchData("http://127.0.0.1:8000/api/products", "GET");
    }, []);

    if (data?.products) {
      data?.products.forEach((item, index) => {
        item.coverimage = gigs[index].img;
        item.pp = gigs[index].pp;
        item.username = gigs[index].username;
        item.star = gigs[index].star;
      });
    }

    console.log("gigs :", data?.products);
   
    return (
      <div className="gigs">
        <div className="container">
          <span className="breadcrumbs">GigCrafters  Graphics & Design </span>
          <h1>AI Artists</h1>
          <p>
            Explore the boundaries of art and technology with GigCrafters' AI artists
          </p>
          <div className="menu">
            <div className="left">
              <span>Budget</span>
              <input ref={minRef} type="number" placeholder="min" />
              <input ref={maxRef} type="number" placeholder="max" />
              <button >Apply</button>
            </div>
            <div className="right">
              <span className="sortBy">Sort by</span>
              <span className="sortType">
                {sort === "sales" ? "Best Selling" : "Newest"}
              </span>
              <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
              {open && (
                <div className="rightMenu">
                  {sort === "sales" ? (
                    <span onClick={() => reSort("createdAt")}>Newest</span>
                  ) : (
                    <span onClick={() => reSort("sales")}>Best Selling</span>
                    )}
                    <span onClick={() => reSort("sales")}>Popular</span>
                </div>
              )}
            </div>
          </div>
          <div className="cards">
          {data?.products ? data?.products.map((gig) => (
            <GigCard key={gig.id} item={gig} />
          )) : null}
        </div>
        </div></div>
    )
}
export default Gigs