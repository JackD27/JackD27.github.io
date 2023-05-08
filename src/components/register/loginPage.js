import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import getUserInfo from '../../utilities/decodeJwt';
import Container from 'react-bootstrap/Container';
import {Col, Row, Button, Card, Form} from 'react-bootstrap';
import LandingPage from "./Landingpage";
import AlertFunction from './AlertMessage';
import {link2} from '../../utilities/api';
import "./loginPage.css"
import "./formInput.css";

const newUrl = `${link2}/login`

const Login2 = () => {

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const [user, setUser] = useState(null)
  const [error, setError] = useState("");


  useEffect(() => {

    setUser(getUserInfo())
    

  }, []);


  if(user) {
    navigate('/dashboard')
  }

  const footMessage = () => {
    if (error) {
      return <AlertFunction variant="danger" isVisible={true} message={error}/>
    } 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const { data: res } = await axios.post(newUrl, values);
      const { accessToken } = res;
      //store token in localStorage
      localStorage.setItem("accessToken", accessToken);
      window.location.replace("/dashboard")
      
      
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const onChange = ({currentTarget: input}) => {
    setValues({ ...values, [input.name]: input.value });
  };

  return (
    <Container style={{ marginTop: 150}}>
      <Row>
        <Col>
        <LandingPage></LandingPage>
      </Col>
      <Col>
    <Card className="loginCard">
      <Card.Header><h2 className="text-white">Log In</h2></Card.Header>
      <Card.Body>
      <Form>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label style={{color: "rgb(151, 151, 151)"}}>Username</Form.Label>
        <Form.Control required={true} type="text" placeholder="Enter Username" pattern="^[A-Za-z0-9]{5,15}$" name="username"onChange={onChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label style={{color: "rgb(151, 151, 151)"}}>Password</Form.Label>
        <Form.Control required={true} type="password" placeholder="Enter Password" name="password"onChange={onChange} />
      </Form.Group>
      <Button variant="success" type="submit" onClick={handleSubmit}>Log In</Button>
      <Button variant="outline-success" style={{marginLeft: 250, color: "white"}} onClick={() => navigate("/register")}>Create Account?</Button>
        {footMessage()}
      </Form>
        </Card.Body>
    </Card>
    </Col>
      </Row>
    </Container>
  );
};

export default Login2;