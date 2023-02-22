import React, { useState, useEffect } from "react";
import getUserInfo from '../../utilities/decodeJwt';
import {Button, Card} from 'react-bootstrap';
import RecurringList from './recurringTransactionListComp';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../register/loginPage.css"

const url = `http://localhost:8085/recurringExpenses/${getUserInfo().user_id.toString()}`;

const MonthlyExpensesCard = () => {

const navigate = useNavigate();

  const [user, setUser] = useState(null)
  const [error, setError] = useState("")
  const [number, setNumber] = useState(0)
  const [yearlyNumber, setYearlyNumber] = useState(0)


    useEffect(() => {

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


  return (
          <Card className="text-center"style={{ background: "rgb(50,58,69)" }}>
            <Card.Header>
              <h2 style={{ color: "#14A44D" }}>Recurring Monthly Expenses</h2>
              <Button variant="outline-success" style={{color: "white"}} onClick={() => navigate("/dashboard2")}>+</Button>
            </Card.Header>
            <Card.Body>
              <RecurringList length="5"/>
            </Card.Body>
            <Card.Footer>
                <Button variant="outline-success" style={{color: "white"}} onClick={() => navigate("/recurringExpenses")}>View all recurring expenses and edit.</Button>
                <h4 style={{marginTop: "5px", color:"white"}}>${number} Monthly</h4>
                <h4 style={{marginTop: "5px", color:"white"}}>${yearlyNumber} Yearly</h4>
            </Card.Footer>
          </Card>
  );
};

export default MonthlyExpensesCard;