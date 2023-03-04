import React, { useState, useEffect } from "react";
import getUserInfo from '../../utilities/decodeJwt';
import {Button, Card} from 'react-bootstrap';
import WatchListComp from './watchListComp';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../register/loginPage.css"

const WatchlistCard = () => {

const navigate = useNavigate();

  const [user, setUser] = useState(null)
  const [error, setError] = useState("")
  const [number, setNumber] = useState(0)
  const [yearlyNumber, setYearlyNumber] = useState(0)


    useEffect(() => {

        setUser(getUserInfo())
    
        
        
        return; 
    }, []);  


  return (
          <Card className="text-center"style={{ background: "rgb(50,58,69)" }}>
            <Card.Header>
              <h2 style={{ color: "#14A44D" }}>Watchlist</h2>
              <Button variant="outline-success" style={{color: "white"}} onClick={() => navigate("/dashboard2")}>+</Button>
            </Card.Header>
            <Card.Body>
              <WatchListComp length="5" show={false}/>
            </Card.Body>
            <Card.Footer>
                <Button variant="outline-success" style={{color: "white"}} onClick={() => navigate("/recurringExpenses")}>View whole watchlist</Button>
            </Card.Footer>
          </Card>
  );
};

export default WatchlistCard;