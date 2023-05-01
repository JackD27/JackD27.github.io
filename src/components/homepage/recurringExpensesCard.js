import React, { useState } from "react";
import {Button, Card} from 'react-bootstrap';
import RecurringList from './recurringTransactionListComp';
import { useNavigate } from "react-router-dom";
import "../register/loginPage.css"



const MonthlyExpensesCard = (props) => {

 const {padding, show} = props

  const [switch1, setSwitch] = useState(false)
  const [title, setTitle] = useState("All")

  const toggleSort = () => {
      setSwitch(!switch1)
      if(switch1){
        setTitle("All")
      }else{
        setTitle("Recurring")
      }
    };


const navigate = useNavigate();
 
  return (
          <Card className="text-center"style={{ background: "rgb(50,58,69)",  paddingBottom: padding }}>
            <Card.Header>
              <h2 style={{ color: "#14A44D" }}><Button variant="outline-success" style={{color: "white"}} onClick={toggleSort}>{title}</Button> Transactions</h2>
              <Button variant="outline-success" style={{color: "white"}} onClick={() => navigate("/addTransaction")}>+</Button>
            </Card.Header>
            <Card.Body>
              <RecurringList length={props.length} show={show} switch={switch1}/>
            </Card.Body>
            <Card.Footer>
                {show ? null : <Button variant="outline-success" style={{color: "white"}} onClick={() => navigate("/transactions")}>View and Edit All Transactions</Button>}
            </Card.Footer>
          </Card>
  );
};

export default MonthlyExpensesCard;