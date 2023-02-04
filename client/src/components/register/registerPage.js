
import FormInput from "./FormInput";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import getUserInfo from '../../utilities/decodeJwt';
import Container from 'react-bootstrap/Container';
import {Col, Row, Button, Alert, Card} from 'react-bootstrap';
import LandingPage from "./Landingpage";
import Modal from 'react-bootstrap/Modal';

const url = "http://localhost:8085/signup";
const url2 = "http://localhost:8085/login";

// Edit Component
export default function Home() {

  const [show, setShow] = useState(false);
  const [isSuccess, setSuccess] = useState(0);
  


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  

  const [values, setValues] = useState({
    username: "",
    email: "",
    income: "",
    password: "",
  });

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  

  useEffect(() => {

    const obj = getUserInfo(user)
    setUser(obj)
    footMessage()

  }, []);

  if(user) {
    navigate('/')
    return
  }

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 5-15 characters and shouldn't include any special character!",
      label: "Enter a Username",
      pattern: "^[A-Za-z0-9]{5,15}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "What's your Email?",
      required: true,
    },
    {
      id: 3,
      name: "income",
      type: "number",
      placeholder: "Income",
      label: "What's your Income?",
      min: "0",
      errorMessage: "It should be a valid income above 0.",
      required: true,
    },
    {
      id: 4,
      name: "password",
      type: "password",
      label: "Enter a Password",
      placeholder: "Password",
      errorMessage: "Enter a password.",
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    if (values.password.length > 0){
      const { data: res } = await axios.post(url, values);
      setSuccess(2);

      const { data: res2 } = await axios.post(url2, values);
      const { accessToken } = res2;
      //store token in localStorage
      localStorage.setItem("accessToken", accessToken);
      
      setTimeout(function(){
        window.location.reload();
     }, 3600);
    }
    else{
      setSuccess(1)
    }
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

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const footMessage = () => {
    if (isSuccess == 1 && error) {
      return <p class="text-danger">{error}</p>;
    } else if (isSuccess == 2) {
      return (
        <p class="text-success">
          Account Successfully Created. You will now login shortly.
        </p>
      );
    } else if (isSuccess == 1 && !error) {
      return <p class="text-danger">{error} Please Input Correct Data.</p>;
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
    <Card>
      <Card.Header><h2>Register</h2></Card.Header>
      <Card.Body>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        </Card.Body>
        <Card.Footer>
        <Button onClick={handleSubmit}>Register</Button>
        <Button variant="outline-primary" style={{marginLeft: 250}} onClick={() => navigate("/login")}>Already have an account?</Button>
        {footMessage()}
        </Card.Footer>
    </Card>
    </Col>
      </Row>
    </Container>
  );
}

