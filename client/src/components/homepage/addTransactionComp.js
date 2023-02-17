import FormInput from "../register/FormInput";
import React, { useState, useEffect } from "react";
import axios from "axios";
import getUserInfo from '../../utilities/decodeJwt';
import {Button, Card, Form} from 'react-bootstrap';
import AlertFunction from '../register/AlertMessage';
import "../register/loginPage.css"

const url = "http://localhost:8085/createTransaction";

const TransactionComp = () => {

  const [user, setUser] = useState(null)
  const [error, setError] = useState("");
  const [isRecurring, setRecurring] = useState(null);
  const [isSuccess, setSuccess] = useState(null);

  useEffect(() => {

    setUser(getUserInfo())

  }, []);



  

  const footMessage = () => {
    if (error) {
      return <AlertFunction variant="danger" show={true} message={error}/>
    } 
    if(isSuccess){
      return <AlertFunction variant="success" show={true} message="Submitted transaction."/>
    }
  };

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      handleSubmit()
    }
  }


  const [values, setValues] = useState({
    name: "",
    description: "",
    date: "",
    price: "",
    category: "",
    category2: "",
    description: "",
    recurring: false,
    userId: getUserInfo().user_id,
  });

  const handleChange= async (e)=>{
    let updatedValue = {};
    updatedValue = {recurring:e.target.checked};
    setValues(values => ({
      ...values,
      ...updatedValue
    }))};
  
  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Name",
      label: "Name",
      required: true,
    },
    {
      id: 2,
      name: "description",
      type: "text",
      label: "Description",
      placeholder: "Description",
      required: false,
    },
    {
        id: 3,
        name: "date",
        type: "date",
        label: "Date",
        placeholder: "Date",
        required: true,
    },
    {
        id: 4,
        name: "price",
        type: "number",
        min: "0",
        label: "Price",
        step: "0.01",
        placeholder: "Price",
        required: true,
      },
      {
        id: 5,
        name: "category",
        type: "text",
        label: "Category",
        placeholder: "Category",
        required: true,
      },
      {
        id: 6,
        name: "category2",
        type: "text",
        label: "Category2",
        placeholder: "Category2",
        required: true,
      },
  ];

  const handleSubmit = async (e) => {
    try {
      const { data: res } = await axios.post(url, values);
      
      setValues({
        name: "",
        description: "",
        date: "",
        price: "",
        category: "",
        category2: "",
        description: "",
        recurring: false,
        userId: getUserInfo().user_id,
      });
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
      <Card.Header><h2 class="text-white">Add Transaction</h2></Card.Header>
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
        <Form.Check type="checkbox" name="recurring" defaultChecked={isRecurring} style={{fontSize: "30px", color:"rgb(151, 151, 151)"}} value={values.recurring}
            onChange={handleChange} label="Recurring?"/>
        </Card.Body>
        <Card.Footer>
        <Button variant="success" onClick={handleSubmit}>Submit</Button>
        {footMessage()}
        </Card.Footer>
    </Card>
  );
};

export default TransactionComp;