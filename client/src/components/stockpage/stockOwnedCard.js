
import React, { useState, useEffect } from "react";
import getUserInfo from '../../utilities/decodeJwt';
import {Button, Card} from 'react-bootstrap';
import StockListComp from './stockOwnedComp';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../register/loginPage.css"

const WatchlistCard = () => {

const navigate = useNavigate();

  return (
          <Card className="text-center"style={{ background: "rgb(50,58,69)" }}>
            <Card.Header>
              <h2 style={{ color: "#14A44D" }}>Stock Portfolio</h2>
              <Button variant="outline-success" style={{color: "white"}} onClick={() => navigate("/dashboard2")}>+</Button>
            </Card.Header>
            <Card.Body>
              <StockListComp length="5" show={true}/>
            </Card.Body>
            <Card.Footer>
                <Button variant="outline-success" style={{color: "white"}} onClick={() => navigate("/allStocks")}>View whole Portfolio</Button>
            </Card.Footer>
          </Card>
  );
};

export default WatchlistCard;