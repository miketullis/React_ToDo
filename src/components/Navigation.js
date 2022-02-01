import React from "react";
import logo from "../images/MRT-Logo.png"
import { Navbar, Nav } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import "./Navigation.css"

export default function Navigation() {
  const { currentUser, authenticate, logout } = useAuth();

  return (
    <Navbar variant="dark" expand="md" className="p-2 dark">
      <Navbar.Brand href="/">
        <img src={logo} alt="logo" className="logo"/> 
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          <Nav className="mr-auto">
            {currentUser && (
              <>
                <Nav.Link href="#/todos">ToDos</Nav.Link>
                <Nav.Link href="#/categories">Categories</Nav.Link>
              </>
            )}
            {currentUser === null && 
              <Nav.Link onClick={() => authenticate()}>
                Login
              </Nav.Link>
            }
            {currentUser && (
              <Nav.Link href="/" onClick={() => logout()}>
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}
