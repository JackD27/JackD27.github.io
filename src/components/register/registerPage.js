
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import getUserInfo from '../../utilities/decodeJwt';
import Container from 'react-bootstrap/Container';
import {Col, Row, Button, Card, Form} from 'react-bootstrap';
import {link2} from '../../utilities/api';
import LandingPage from "./Landingpage";
import AlertFunction from './AlertMessage';

const url = `${link2}/signup`;
const url2 = `${link2}/login`;

// Edit Component
export default function Home() {

  const [isSuccess, setSuccess] = useState(0);
  
  const [values, setValues] = useState({
    username: "",
    email: "",
    income: 0,
    password: "",
  });

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  

  useEffect(() => {

    setUser(getUserInfo())
    footMessage()

  }, []);

  if(user) {
    navigate('/dashboard')
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const { data: res } = await axios.post(url, values);
      setSuccess(2);

      const { data: res2 } = await axios.post(url2, values);
      const { accessToken } = res2;
      //store token in localStorage
      localStorage.setItem("accessToken", accessToken);
      
      setTimeout(function(){
        window.location.reload();
     }, 3600);
    
    
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setSuccess(1);
        console.log(error.response.data.message)
      }
    }
  };

  const onChange = ({currentTarget: input}) => {
    setValues({ ...values, [input.name]: input.value });
  };

  const onChangeNumber = ({currentTarget: input}) => {
    setValues({ ...values, [input.name]: input.valueAsNumber });
  };

  const footMessage = () => {
    if (isSuccess === 1 && error) {
      return <AlertFunction variant="danger" message={error}/>
    } else if (isSuccess === 2) {
      return (
        <AlertFunction variant="success" message="Account Successfully Created. You will now login shortly."/>
      );
    } else if (isSuccess === 1 && !error) {
      return <AlertFunction variant="danger" message="Registration failed. Please input correct data. Password is short."/>
    } else {
      return null;
    }
  };

  // This following section will display the form that takes input from the user to update the data.
  return (
    <Container style={{ marginTop: 150 }}>
      <Row>
        <Col>
        <LandingPage></LandingPage>
      </Col>
      <Col>
    <Card className="loginCard">
      <Card.Header><h2 className="text-white">Register</h2></Card.Header>
      <Card.Body>
      <Form>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label style={{color: "rgb(151, 151, 151)"}}>Username</Form.Label>
        <Form.Control required={true} type="text" placeholder="Enter Username" pattern="^[A-Za-z0-9]{5,15}$" name="username"onChange={onChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label style={{color: "rgb(151, 151, 151)"}}>What's your Email?</Form.Label>
        <Form.Control required={true} type="email" placeholder="Enter Email"name="email"onChange={onChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicIncome">
        <Form.Label style={{color: "rgb(151, 151, 151)"}}>What's your Income?</Form.Label>
        <Form.Control required={true} type="number" placeholder="Enter Income" name="income"onChange={onChangeNumber} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label style={{color: "rgb(151, 151, 151)"}}>Password</Form.Label>
        <Form.Control required={true} type="password" placeholder="Enter Password" name="password"onChange={onChange} />
      </Form.Group>
      <Button variant="success" type="submit" onClick={handleSubmit}>Register</Button>
      <Button variant="outline-success" style={{marginLeft: 250, color: "white"}} onClick={() => navigate("/")}>Already have an account?</Button>
        {footMessage()}
      </Form>
      </Card.Body>
    </Card>
    </Col>
      </Row>
    </Container>
  );
}

