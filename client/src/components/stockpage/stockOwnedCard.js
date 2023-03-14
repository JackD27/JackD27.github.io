import React, {useState} from "react";
import {Button, Card} from 'react-bootstrap';
import StockListComp from './stockOwnedComp';
import { useNavigate } from "react-router-dom";
import "../register/loginPage.css"

const WatchlistCard = () => {

const navigate = useNavigate();

  return (
          <Card className="text-center"style={{ background: "rgb(50,58,69)" }}>
            <Card.Header>
              <h2 style={{ color: "#14A44D" }}>Stock Portfolio</h2>
              <Button variant="outline-success" style={{color: "white"}} onClick={() => navigate("/addStock")}>+</Button>
            </Card.Header>
            <Card.Body>
              <StockListComp length="7" show={true}/>
            </Card.Body>
            <Card.Footer>
                <Button variant="outline-success" style={{color: "white"}} onClick={() => navigate("/allStocks")}>View whole Portfolio</Button>
            </Card.Footer>
          </Card>
  );
};

export default WatchlistCard;