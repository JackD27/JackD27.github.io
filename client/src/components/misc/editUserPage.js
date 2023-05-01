import FormInput from "../register/FormInput";
import React, { useState} from "react";
import axios from "axios";
import getUserInfo from '../../utilities/decodeJwt';
import {Button, Card } from 'react-bootstrap';
import AlertFunction from '../register/AlertMessage';
import {link2} from '../../utilities/api';
import "../register/loginPage.css"

const url = `${link2}/editUser`;
const loginUrl = `${link2}/login`;

const ChangeSettingsComp = () => {

  const [error, setError] = useState("");
  const [isSuccess, setSuccess] = useState(null);

  const footMessage = () => {
    if (error) {
      return <AlertFunction variant="danger" show={true} message={error}/>
    } 
    if(isSuccess){
      return <AlertFunction variant="success" show={true} message="Successfully updated your account. Page will refresh shortly."/>
    }
  };

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      handleSubmit()
    }
  }


  const [values, setValues] = useState({
    username: getUserInfo().username,
    password: "",
    email: getUserInfo().email,
    tradingType: getUserInfo().tradingType,
    income: getUserInfo().income,
    userId: getUserInfo().user_id,
  });
  
  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Enter new username",
      label: "Change Username",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Enter new password",
      label: "Change Password",
      required: true,
    },
    {
      id: 3,
      name: "income",
      type: "number",
      placeholder: "Enter new income",
      label: "Change Income",
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    try {
      await axios.post(url, values);   
      
      setError(false);
      setSuccess(true)

      localStorage.clear()

      const { data: res2 } = await axios.post(loginUrl, values);

      const { accessToken } = res2;
      localStorage.setItem("accessToken", accessToken);
      
      setTimeout(function(){
        window.location.reload();;
     }, 3600);

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
      <Card.Header><h2 className="text-white">Change Settings</h2></Card.Header>
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

export default ChangeSettingsComp;