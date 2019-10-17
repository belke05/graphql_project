import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function MainNav() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <Link to="/" className="router_link">
            <h1>Graphql &#x1F3A5; queries</h1>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#">
              <Link to="/moviestable" className="router_link">
                Movie-table
              </Link>
            </Nav.Link>
            <Nav.Link href="#">
              <Link to="/directorstable" className="router_link">
                director-table
              </Link>
            </Nav.Link>
            <Nav.Link href="#">
              <Link to="/director" className="router_link">
                search a director 
              </Link>
            </Nav.Link>
            <Nav.Link href="#">
              <Link to="/movie" className="router_link">
                search a movie
              </Link>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#"></Nav.Link>
            <Nav.Link eventKey={2} href="#memes"></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
