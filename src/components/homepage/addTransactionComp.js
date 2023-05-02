import FormInput from "../register/FormInput";
import React, { useEffect, useState, } from "react";
import axios from "axios";
import getUserInfo from '../../utilities/decodeJwt';
import {Button, Card, Form} from 'react-bootstrap';
import AlertFunction from '../register/AlertMessage';
import {link2} from '../../utilities/api';
import "../register/loginPage.css"

const url = `${link2}/createTransaction`;

const TransactionComp = () => {

  const [error, setError] = useState("");
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [category2, setCategory2] = useState("");
  const [isRecurring, setRecurring] = useState(false);
  const [isSuccess, setSuccess] = useState(null);


  const footMessage = () => {
    if (error) {
      return <AlertFunction variant="danger" show={true} message={error}/>
    } 
    if(isSuccess){
      return <AlertFunction variant="success" show={true} message="Submitted transaction."/>
    }
  };


  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {

    const { data: res } = await axios.post(url, {
        name: name,
        description: description,
        date: String(date),
        price: Number(price),
        category: category,
        category2: category2,
        recurring: isRecurring,
        userId: user.user_id,
      }, {headers: {'Content-Type': 'application/json'}});

      console.log(res)

      
      setError(0)
      setSuccess(1);

      setDescription("");
      setDate("");
      setPrice("");
      setCategory("");
      setCategory2("");
      setName("");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setSuccess(0);
        console.log(error)
      }
    }
  };

  return (
    <Card className="loginCard">
      <Card.Header><h2 className="text-white">Add Transaction</h2></Card.Header>
      <Card.Body>
      <Form>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label style={{color: "rgb(151, 151, 151)"}}>Name</Form.Label>
        <Form.Control value={name} type="text" placeholder="Enter Name of Transaction" name="name"onChange={(e)=> setName(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicDescription">
        <Form.Label style={{color: "rgb(151, 151, 151)"}}>Description</Form.Label>
        <Form.Control value={description} type="text" placeholder="Enter Description of Transaction"name="description"onChange={(e)=> setDescription(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicDate">
        <Form.Label style={{color: "rgb(151, 151, 151)"}}>Date of Transaction</Form.Label>
        <Form.Control value={date} type="date" placeholder="Date of Transaction" name="date"onChange={(e)=> setDate(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPrice">
        <Form.Label style={{color: "rgb(151, 151, 151)"}}>Price of Transaction</Form.Label>
        <Form.Control value={price} min={0} step={0.01} type="number" placeholder="Price of Transaction" name="price"onChange={(e)=> setPrice(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCategory1">
        <Form.Label style={{color: "rgb(151, 151, 151)"}}>Main Category</Form.Label>
        <div>
        <select onChange={(e)=> setCategory(e.target.value)} value={category}>
          <option></option>
          <option>Wants</option>
          <option>Needs</option>
          <option>Savings</option>
        </select>
        </div>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCategory2">
        <Form.Label style={{color: "rgb(151, 151, 151)"}}>Second Category</Form.Label>
        <div>
        <select onChange={(e)=> setCategory2(e.target.value)} value={category2}>
          <option></option>
          <option>Entertainment</option>
          <option>Transportation</option>
          <option>Food</option>
          <option>Housing</option>
          <option>Misc</option>
        </select>
        </div>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label style={{color: "rgb(151, 151, 151)"}}>Recurring Transaction?</Form.Label>
        <Form.Check type="checkbox" name="recurring" onChange={(e)=> setRecurring(e.target.checked)} />
      </Form.Group>
      <Button variant="success" type="submit" onClick={handleSubmit}>Submit</Button>
        {footMessage()}
      </Form>
      </Card.Body>
    </Card>
  );
};

export default TransactionComp;