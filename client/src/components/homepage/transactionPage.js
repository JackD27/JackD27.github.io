import React from "react";
import {Button, Card} from 'react-bootstrap';
import TransactionList from './transactionListComp';
import { useNavigate } from "react-router-dom";
import "../register/loginPage.css"


const TransactionPage = () => {

const navigate = useNavigate();

  return (
          <Card className="text-center"style={{ background: "rgb(50,58,69)", paddingBottom:"600px"}}>
            <Card.Header>
              <h2 style={{ color: "#14A44D" }}>All Transactions</h2>
              <Button variant="outline-success" style={{color: "white"}} onClick={() => navigate("/dashboard2")}>+</Button>
            </Card.Header>
            <Card.Body>
              <TransactionList show="true"length="20"/>
            </Card.Body>
            <Card.Footer></Card.Footer>
          </Card>
  );
};

export default TransactionPage;