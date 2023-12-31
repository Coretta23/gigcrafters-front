import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [active,setActive]= useState(false);
  const [open,setOpen]= useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const isActive = ()=>{
  window.scrollY > 0 ? setActive(true) : setActive(false)
}
  useEffect(()=>{
    window.addEventListener("scroll", isActive);
    
    return ()=>{
      window.removeEventListener("scroll", isActive);
    };
  },[]
  );

  function handleLogin() {
    navigate("/login");
  }

  function handleLogout() {
    localStorage.removeItem("currentUser");
    navigate("/");
  }

  return (
    <div className= {active || pathname !== "/" ? "navbar active" : "navbar"}>
       <div className="container">
        <div className="logo">
          <Link to='/' className="link">
          <span className="text">GigCrafters</span>
          </Link>
        
          <span className="dot">.</span>
        </div>
        <div className="links">
         
          {currentUser?.access_token ? (
            <>
              <Link to="/gigs">Explore</Link>
              {currentUser?.user?.role === "client" && <span>Become a Seller</span>}
              {currentUser &&
                <div className="user" onClick={()=>setOpen(!open)}> 
                <img src="https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
                <span> {currentUser?.username}</span>
                {open && <div className="options">
                    {currentUser?.user?.role === "marchand" &&(
                      <>
                        <Link className="link"  to= "/mygigs">My gigs</Link>
                        <Link className="link" to= "/add">Add New Gig</Link>
                      </>
                      )
                    }
                    <Link className="link" to= "/orders">Orders</Link>
                    <Link className="link" to= "/messages">Messages</Link>
                    <Link className="link" to="/" onClick={handleLogout}>Logout</Link>
                  </div>}
                </div>
              }
            </>
          ) : (
            <button onClick={handleLogin}>Sign in / Sign up</button>
          )}
        </div>
        

       </div>
       { (active || pathname !== "/")  &&(
    <> 
       <hr />
       <div className="menu">
            <Link className="link menuLink" to="/">
              Graphics & Design
            </Link>
            <Link className="link menuLink" to="/">
              Video & Animation
            </Link>
            <Link className="link menuLink" to="/">
              Writing & Translation
            </Link>
            <Link className="link menuLink" to="/">
              AI Services
            </Link>
            <Link className="link menuLink" to="/">
              Digital Marketing
            </Link>
            <Link className="link menuLink" to="/">
              Music & Audio
            </Link>
            <Link className="link menuLink" to="/">
              Programming & Tech
            </Link>
            <Link className="link menuLink" to="/">
              Business
            </Link>
            <Link className="link menuLink" to="/">
              Lifestyle
            </Link>
          </div>
       </> 
       )}
    </div>
        
  );   
         
};

export default Navbar;
