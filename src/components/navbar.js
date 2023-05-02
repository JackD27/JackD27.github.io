import React, { useEffect, useState } from "react";
import getUserInfo from '../utilities/decodeJwt';
import { Navbar, Nav, NavDropdown,Container, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { GoMarkGithub } from "react-icons/go";
import { GrLinkedin } from "react-icons/gr";
import { BsTrello } from "react-icons/bs";

// Here, we display our Navbar
export default function NavbarFunction() {
  const [user, setUser] = useState({})

  const handleLogout = async () => {
    localStorage.clear();
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
    <Navbar bg="dark"variant="dark"className="mb-4">
      <Container>
      <Navbar.Brand as={Link} to="/dashboard" className="mx-3"> MoneyPad</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/dashboard">Home</Nav.Link>
          <Nav.Link as={Link} to="/stocks">Stocks</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown className="mx-3" title={userName()} id="collasible-nav-dropdown">
            <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
            {user.user_id === 374 ? <NavDropdown.Item as={Link} to="/admin">Admin</NavDropdown.Item> : null}
            <NavDropdown.Divider />
            <NavDropdown.Item><Link to={`https://www.linkedin.com/in/jackson-davis-3696a9258/`} style={{ textDecoration: 'none', color: 'black'}}><GrLinkedin size={20} color="#0077B5"/> LinkedIn</Link></NavDropdown.Item>
            <NavDropdown.Item><Link to={`https://github.com/JackD27/CapstoneProject`} style={{ textDecoration: 'none', color: 'black'}}><GoMarkGithub size={20} color="#333"/> Github</Link></NavDropdown.Item>
            <NavDropdown.Item><Link to={`https://trello.com/b/cE22K4xL/jacksons-capstone-project`} style={{ textDecoration: 'none', color: 'black'}}><BsTrello size={20} color="#0079BF"/> Trello</Link></NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>{authButton()}</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}}