import React, { useState, useEffect } from "react";
import getUserInfo from '../../utilities/decodeJwt';
import {Button, Card} from 'react-bootstrap';
import ExpenseList from './recurringTransactionListComp';
import { useNavigate } from "react-router-dom";
import "../register/loginPage.css"
import axios from "axios";
import "../register/loginPage.css"



const RecurringExpensePage = () => {

const navigate = useNavigate();

  const [user, setUser] = useState(null)
  const [number, setNumber] = useState(0)
  const [yearlyNumber, setYearlyNumber] = useState(0)

  useEffect(() => {

    const url = `http://localhost:8085/recurringExpenses/${user.user_id.toString()}`;

    

      async function getNumber() {
        axios
          .get(url)
          .then(({ data }) => {
              var sum = 0;
              data.forEach(transaction => {
                  
                  sum += parseFloat(transaction.price);
              });
              setNumber(sum.toFixed(2))
              setYearlyNumber(number * 12)
          })
          .catch((err) => {});
      }
      
      getNumber()
      console.log(number);   
      setUser(getUserInfo())
  
      
      
      return; 
  }, [number.length]);  

  if(!user) {
    navigate('/login')
    return
  }



  return (
          <Card className="text-center"style={{ background: "rgb(50,58,69)", paddingBottom:"600px"}}>
            <Card.Header>
              <h2 style={{ color: "#14A44D" }}>All Reccurring Monthly Expenses</h2>
              <h4 style={{marginTop: "5px", color:"white"}}>${number} Monthly</h4>
              <h4 style={{marginTop: "5px", color:"white"}}>${yearlyNumber} Yearly</h4>
              <Button variant="outline-success" style={{color: "white"}} onClick={() => navigate("/dashboard2")}>+</Button>
            </Card.Header>
            <Card.Body>
              <ExpenseList show="true"length="20"/>
            </Card.Body>
            <Card.Footer></Card.Footer>
          </Card>
  );
};

export default RecurringExpensePage;