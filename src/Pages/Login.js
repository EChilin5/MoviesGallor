import React, { useState } from "react";
import LoginComponent from "../Components/LoginComponents/LoginComponent";
import SignUpComponent from "../Components/LoginComponents/SignUpComponent";
import "./Login.css";

const Login = () => {
  const [displaySignUp, setDisplaySignUp] = useState(false);

  const updateSignUp = () => {
    console.log("hello click");
    setDisplaySignUp(true);
  };

  return (
    <div className="admin-main">
      {displaySignUp ? (
        <div>
          {" "}
          <SignUpComponent />{" "}
        </div>
      ) : (
        <div>
          <LoginComponent display={updateSignUp} />
        </div>
      )}
    </div>
  );
};

export default Login;
