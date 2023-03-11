import FormInput from "../register/FormInput";
import React, { useState, } from "react";
import axios from "axios";
import getUserInfo from '../../utilities/decodeJwt';
import {Button, Card, Form} from 'react-bootstrap';
import AlertFunction from '../register/AlertMessage';
import "../register/loginPage.css"

const url = "http://localhost:8085/createTransaction";

const TransactionComp = () => {

  const [error, setError] = useState("");
  const [isRecurring, setRecurring] = useState(null);
  const [isSuccess, setSuccess] = useState(null);


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
  ];

  const category1 = [
    {
      id: 1,
      value: "",
    },
    {
      id: 2,
      value: "Wants",
    },
    {
      id: 3,
      value: "Needs",
    },
    {
      id: 4,
      value: "Savings",
    },
  ];

  const category2 = [
    {
      id: 1,
      value: "",
    },
    {
      id: 2,
      value: "Entertainment",
    },
    {
      id: 3,
      value: "Transportation",
    },
    {
      id: 4,
      value: "Food",
    },
    {
      id: 5,
      value: "Housing",
    },
    {
      id: 6,
      value: "Misc",
    },
  ];

  const handleSubmit = async (e) => {
    console.log(values)
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
        <div style={{color: "rgb(151, 151, 151)", fontSize: "12px", marginTop: "5px"}}>Main Category</div>
        <select style={{marginTop: "5px"}} name="category"onChange={onChange}>
          {category1.map((input) =>(
            <option>{input.value}</option>
          ))}
        </select>
        <div style={{color: "rgb(151, 151, 151)", fontSize: "12px", marginTop: "5px"}}>Secondary Category</div>
        <select style={{marginTop: "5px"}} name="category2" onChange={onChange}>
        {category2.map((input) =>(
            <option>{input.value}</option>
          ))}
        </select>
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