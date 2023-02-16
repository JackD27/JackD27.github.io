
import FormInput from "./FormInput";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import getUserInfo from '../../utilities/decodeJwt';
import Container from 'react-bootstrap/Container';
import {Col, Row, Button, Card} from 'react-bootstrap';
import LandingPage from "./Landingpage";
import AlertFunction from './AlertMessage';

const url = "http://localhost:8085/signup";
const url2 = "http://localhost:8085/login";

// Edit Component
export default function Home() {

  const [isSuccess, setSuccess] = useState(0);
  
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

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      handleSubmit()
    }
  }

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Enter a Username",
      pattern: "^[A-Za-z0-9]{5,15}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
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
      required: true,
    },
    {
      id: 4,
      name: "password",
      type: "password",
      label: "Enter a Password",
      placeholder: "Password",
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
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
      <Card.Header><h2 class="text-white">Register</h2></Card.Header>
      <Card.Body>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
            onKeyPress={handleKeyPress}
          />
        ))}
        </Card.Body>
        <Card.Footer>
        <Button variant="success"onClick={handleSubmit}>Register</Button>
        <Button variant="outline-success" style={{marginLeft: 250, color: "white"}} onClick={() => navigate("/login")}>Already have an account?</Button>
        {footMessage()}
        </Card.Footer>
    </Card>
    </Col>
      </Row>
    </Container>
  );
}

