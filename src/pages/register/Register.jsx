import React from "react";
import "./Register.scss"
import SignUp from "./SignUp";

function Register() {
    
    return (
        < div className="login" style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#03045e",
        }}>
            <div style={{
                width: "50%",
                height: "100%",
                background: "white",
                margin: "15px 0",
                borderRadius: 4,
                paddingBottom: "40px"
            }}>
                <SignUp />
            </div>
        </ div>
    )
};

export default Register;