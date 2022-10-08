import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./SignUp.css";
import axios from "axios";

const SignUpComponent = () => {
  let baseUrl = `https://localhost:44332/api/UserTableValues`;

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    cityState: "",
    card: "",
  });

  const closeWindow = () => {
    window.close();
    window.open("http://localhost:3000/");
  };

  const firstNameChangeHandler = (event) => {
    setUserInfo((prevState) => {
      return { ...prevState, firstName: event.target.value };
    });
  };

  const lastNameChangeHandler = (event) => {
    setUserInfo((prevState) => {
      return { ...prevState, lastName: event.target.value };
    });
  };

  const emailChangeHandler = (event) => {
    setUserInfo((prevState) => {
      return { ...prevState, email: event.target.value };
    });
  };
  const passwordChangeHandler = (event) => {
    setUserInfo((prevState) => {
      return { ...prevState, password: event.target.value };
    });
  };
  const passwordConfirmChangeHandler = (event) => {
    setUserInfo((prevState) => {
      return { ...prevState, confirmPassword: event.target.value };
    });
  };

  const submitUserSignIn = () => {
    if (userInfo.confirmPassword === userInfo.password) {
      let userData = {
        name: userInfo.firstName + " " + userInfo.lastName,
        email: userInfo.email,
        password: userInfo.password,
      };
      console.log(userData);
      const result = axios.post(`${baseUrl}`, userData);
      console.log(result.data);
      localStorage.setItem("user", userInfo.email);

      closeWindow();
    } else {
      alert("Password do not match");
    }
  };
  return (
    <div>
      <div className="signUp">
        <h1>Sign Up</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Name"
              onChange={(event) => firstNameChangeHandler(event)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter lastName"
              onChange={(event) => lastNameChangeHandler(event)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
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
          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(event) => passwordConfirmChangeHandler(event)}
            />
          </Form.Group>

          <Button variant="primary" onClick={() => submitUserSignIn()}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SignUpComponent;
