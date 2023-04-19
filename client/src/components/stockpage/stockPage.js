import React from "react";
import {Button, Card} from 'react-bootstrap';
import StockOwnedComp from './stockOwnedComp';
import { useNavigate } from "react-router-dom";

import "../register/loginPage.css"

const StockPage = () => {

const navigate = useNavigate();

  return (
          <Card className="text-center"style={{ background: "rgb(50,58,69)", paddingBottom:"600px"}}>
            <Card.Header>
              <h2 style={{ color: "#14A44D" }}>All Stocks</h2>
              <Button variant="outline-success" style={{color: "white"}} onClick={() => navigate("/addStock")}>+</Button>
            </Card.Header>
            <Card.Body>
              <StockOwnedComp show="true"length="20" delete={true}/>
            </Card.Body>
            <Card.Footer></Card.Footer>
          </Card>
  );
};

export default StockPage;