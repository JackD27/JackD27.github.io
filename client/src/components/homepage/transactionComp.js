import FormInput from "../register/FormInput";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import getUserInfo from '../../utilities/decodeJwt';
import Container from 'react-bootstrap/Container';
import {Col, Row, Button, Card} from 'react-bootstrap';
import LandingPage from "../register/Landingpage";
import AlertFunction from '../register/AlertMessage';
import "../register/loginPage.css"

const url = "http://localhost:8085/createTransaction";




const TransactionComp = () => {

  

  const navigate = useNavigate();
  const [user, setUser] = useState(null)
  const [error, setError] = useState("");

  useEffect(() => {

    setUser(getUserInfo())
    console.log(getUserInfo().user_id)

  }, []);

  const [values, setValues] = useState({
    name: "",
    description: "",
    date: "",
    price: "",
    category: "",
    category2: "",
    description: "",
    recurring: 0,
    userId: getUserInfo().user_id,
  });

  

  

  const footMessage = () => {
    if (error) {
      return <AlertFunction variant="danger" show={true} message={error}/>
    } 
  };

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      handleSubmit()
    }
  }

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Name",
      errorMessage:
        "Input name of transaction.",
      label: "Name",
      required: true,
    },
    {
      id: 2,
      name: "description",
      type: "text",
      label: "Description",
      placeholder: "Description",
      errorMessage: "Input a description(You can leave this empty.)",
      required: false,
    },
    {
        id: 3,
        name: "date",
        type: "date",
        label: "Date",
        placeholder: "Date",
        errorMessage: "Input the date of the transaction.",
        required: true,
    },
    {
        id: 4,
        name: "price",
        type: "number",
        min: "0",
        label: "Price",
        placeholder: "Price",
        errorMessage: "Input price of the transaction.",
        required: true,
      },
      {
        id: 5,
        name: "category",
        type: "text",
        label: "Category",
        placeholder: "Category",
        errorMessage: "Input Needs, Wants, or Savings.",
        required: true,
      },
      {
        id: 6,
        name: "category2",
        type: "text",
        label: "Category2",
        placeholder: "Category2",
        errorMessage: "Input other category.",
        required: true,
      },
      {
        id: 7,
        name: "recurring",
        type: "checkbox",
        label: "Recurring?",
        placeholder: "Is it recurring?",
        value: "Recurring?",
        errorMessage: "Click the checkbox or not.",
        required: true,
      },
  ];

  const handleSubmit = async (e) => {
    try {
      const { data: res } = await axios.post(url, values);
      console.log(res)
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


  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Container style={{ marginTop: 150}}>
      <Row>
        <Col>
        <LandingPage></LandingPage>
      </Col>
      <Col>
    <Card className="loginCard">
      <Card.Header><h2 class="text-white">Transaction</h2></Card.Header>
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
        <Button variant="success" onClick={handleSubmit}>Submit</Button>
        {footMessage()}
        </Card.Footer>
    </Card>
    </Col>
      </Row>
    </Container>
  );
};

export default TransactionComp;