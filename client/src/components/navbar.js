import React, { useEffect, useState } from "react";
import getUserInfo from '../utilities/decodeJwt';
import { Navbar, Nav, NavDropdown, Form, Button, ButtonGroup } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'

// Here, we display our Navbar
export default function NavbarFunction() {
  const navigate = useNavigate()
  const [user, setUser] = useState({})

  const handleLogout = async () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const authButton = () => {
    if (user) {
        return (
          <Button variant="danger" onClick={handleLogout}>Logout</Button>
        )       
}}

  useEffect(() => {
    setUser(getUserInfo())
  }, [])

  if(user){
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="mb-3">
            <Navbar.Brand as={Link} to="/" className="mx-3">MoneyPad</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/">Main</Nav.Link>
                    <NavDropdown title="Stocks" id="collasible-nav-dropdown">
                        <NavDropdown.Item as={Link} to="/portfolio">Portfolio</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/watchlist">Watchlist</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            <Form inline className="mx-3">
                {authButton()}
            </Form>
        </Navbar>

  );
}}