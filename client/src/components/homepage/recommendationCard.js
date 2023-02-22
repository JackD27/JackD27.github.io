import React, { useState, useEffect } from "react";
import getUserInfo from '../../utilities/decodeJwt';
import {Button, Card} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../register/loginPage.css"

const url = `http://localhost:8085/recurringExpenses/${getUserInfo().user_id.toString()}`;

const RecommendationCard = () => {

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: "0",
      });

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
          <Card className="text-center"style={{ background: "rgb(50,58,69)", marginTop: "15px"}}>
            <Card.Header>
              <h2 style={{ color: "#14A44D" }}>Recommendations</h2>
            </Card.Header>
            <Card.Body>
                <h4 style={{ color: "white" }}>Max Car Price: {formatter.format(getUserInfo().income * .35)}</h4>
                <h4 style={{ color: "white" }}>Max House Price WIP: {formatter.format(getUserInfo().income * 4)}</h4>
            </Card.Body>
            <Card.Footer>
            </Card.Footer>
          </Card>
  );
};

export default RecommendationCard;