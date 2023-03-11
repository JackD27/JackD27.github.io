import React from "react";
import { Button, Card } from 'react-bootstrap';
import TransactionList from './transactionListComp';
import { useNavigate } from "react-router-dom";
import "../register/loginPage.css"

const RecentTransactionCard = () => {

const navigate = useNavigate();

  return (
          <Card className="text-center"style={{ background: "rgb(50,58,69)", marginTop: "15px"}}>
            <Card.Header>
              <h2 style={{ color: "#14A44D" }}>Recent Transactions</h2>
              <Button variant="outline-success" style={{color: "white"}} onClick={() => navigate("/dashboard2")}>+</Button>
            </Card.Header>
            <Card.Body>
              <TransactionList length="5"/>
            </Card.Body>
            <Card.Footer><Button variant="outline-success" style={{color: "white"}} onClick={() => navigate("/transactions")}>View all transactions and edit.</Button></Card.Footer>
          </Card>
  );
};

export default RecentTransactionCard;