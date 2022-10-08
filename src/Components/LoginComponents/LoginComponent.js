import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./LoginComponent.css";
import axios from "axios";

const LoginComponent = (props) => {
  let baseUrl = `https://localhost:44332/api/UserTableValues`;

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const clickSigUp = () => {
    console.log("hello tesy");
    props.display();
  };

  const emailChangeHandler = (event) => {
    setLogin((prevState) => {
      return { ...prevState, email: event.target.value };
    });
  };

  const passwordChangeHandler = (event) => {
    setLogin((prevState) => {
      return { ...prevState, password: event.target.value };
    });
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = loggedInUser;
      console.log(foundUser);
    }
  }, []);

  const closeWindow = () => {
    window.close();
    window.open("http://localhost:3000/");
  };

  const checkLogin = () => {
    console.log(login.email);

    if ((login.email !== "") & (login.password !== "")) {
      console.log(login.password);
      const credientials = {
        email: login.email,
        password: login.password,
      };

      axios.put(baseUrl, credientials).then((res) => {
        console.log(res.data);
        let isValid = res.data[0];

        if (isValid.firstName !== null && isValid.userId !== null) {
          localStorage.setItem("user", login.email);
          localStorage.setItem("userId", isValid.userId);
          console.log("User is Signed In");
          closeWindow();
        } else {
          alert("Incorrect UserName or password");
        }
      });
    }
  };

  return (
    <div>
      <div className="loginForm">
        <h1>Login</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(event) => emailChangeHandler(event)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(event) => passwordChangeHandler(event)}
            />
          </Form.Group>

          <Button variant="primary" onClick={() => checkLogin()}>
            Sign In
          </Button>
          <Button variant="secondary" onClick={() => clickSigUp()}>
            Sign Up
          </Button>
          <div className="loginform-reset">Forgot Password</div>
        </Form>
      </div>
    </div>
  );
};

export default LoginComponent;
