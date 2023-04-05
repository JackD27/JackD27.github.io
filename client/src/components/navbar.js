import React, { useEffect, useState } from "react";
import getUserInfo from '../utilities/decodeJwt';
import { Navbar, Nav, NavDropdown,Container, Button} from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'

// Here, we display our Navbar
export default function NavbarFunction() {
  const navigate = useNavigate()
  const [user, setUser] = useState({})

  const handleLogout = async () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  const authButton = () => {
    return (<Button variant="danger" size="sm" onClick={handleLogout}>Logout</Button>)};

    const userName = () => {
      return ( <>{user.username}</>)};

  useEffect(() => {
    setUser(getUserInfo())
  }, [])

  if(user){
  return (
    <Navbar collapseOnSelectexpand="lg"bg="dark"variant="dark"className="mb-4">
      <Container>
      <Navbar.Brand as={Link} to="/" className="mx-3"> MoneyPad</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/stocks">Stocks</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown inline className="mx-3" title={userName()} id="collasible-nav-dropdown">
            <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>{authButton()}</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}}