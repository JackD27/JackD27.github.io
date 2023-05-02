import FormInput from "../register/FormInput";
import React, { useState } from "react";
import axios from "axios";
import getUserInfo from '../../utilities/decodeJwt';
import {Button, Card, Form} from 'react-bootstrap';
import AlertFunction from '../register/AlertMessage';
import {link2} from '../../utilities/api';
import "../register/loginPage.css"

const url = `${link2}/addPortfolioItem`;

const AddPortfolioComp = () => {
  const [error, setError] = useState("");
  const [isSuccess, setSuccess] = useState(null);


  const footMessage = () => {
    if (error) {
      return <AlertFunction variant="danger" show={true} message={error}/>
    } 
    if(isSuccess){
      return <AlertFunction variant="success" show={true} message="Submitted stock to portfolio."/>
    }
  };

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      handleSubmit()
    }
  }


  const [values, setValues] = useState({
    stockTicker: "",
    dateBoughtAt: "",
    price: 0,
    shares: 0,
    userId: getUserInfo().user_id,
  });
  
  const inputs = [
    {
      id: 1,
      name: "stockTicker",
      type: "text",
      placeholder: "Ticker",
      label: "Stock Ticker",
      required: true,
    },
    {
        id: 2,
        name: "dateBoughtAt",
        type: "date",
        label: "Date of Purchase",
        placeholder: "Date",
        required: true,
    },
    {
        id: 3,
        name: "price",
        type: "number",
        min: "0",
        label: "Price purchased at",
        step: "0.01",
        placeholder: "Price",
        required: true,
      },
      {
        id: 4,
        name: "shares",
        type: "number",
        min: "0",
        label: "Number of shares you bought",
        step: "0.01",
        placeholder: "Shares",
        required: true,
      },
  ];

  const handleSubmit = async (e) => {
    try {
      const { data: res } = await axios.post(url, values);
      
      setValues({
        stockTicker: "",
        dateBoughtAt: "",
        price: 0,
        shares: 0,
        userId: getUserInfo().user_id,
      });
      setError(false);
      setSuccess(true)
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


  const onChange = async (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Card className="loginCard">
      <Card.Header><h2 className="text-white">Add Stock to Portfolio</h2></Card.Header>
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
  );
};

export default AddPortfolioComp;