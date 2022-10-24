import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ItemDetail } from "../Components/ItemDetail";
import { HomePage } from "../Pages/HomePage";
import Login from "../Pages/Login";
import MovieCatalog from "../Pages/MovieCatalog";
import { Button } from "react-bootstrap";

const NavBarComponent = () => {
  const [user, setUser] = useState("Log In");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = loggedInUser;
      console.log(foundUser);
      setUser(loggedInUser);
    } else {
      setUser("Log In");
    }
  }, [localStorage.getItem("user")]);

  const logoutUser = () => {
    localStorage.removeItem("user");
    setUser("Log In");
  };

  return (
    <div>
      <Router>
        <div>
          <Navbar expand="lg" bg="dark" variant="dark" fixed="top">
            <Container>
              <Navbar.Brand href="/">Movies Gallor</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to={"/"}>
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to="/catalog">
                    Movie Catalog
                  </Nav.Link>
                  <Nav.Link as={Link} to="/login">
                    {user}
                  </Nav.Link>
                </Nav>
                {user === "Log In" ? (
                  ""
                ) : (
                  <div>
                    <Button onClick={() => logoutUser()}>Log Out</Button>
                  </div>
                )}
              </Navbar.Collapse>
            </Container>
          </Navbar>{" "}
        </div>

        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<MovieCatalog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/catalog/item/:id" element={<ItemDetail />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default NavBarComponent;
