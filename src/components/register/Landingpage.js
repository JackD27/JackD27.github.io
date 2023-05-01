import React from 'react'
import Card from 'react-bootstrap/Card';

const Landingpage = () => {
    
    return (
        <Card border="success" style={{ width: '35rem', height: "28rem", backgroundColor: "rgb(234,237,242)"}} className="mx-2 my-2">
        <Card.Body>
          <Card.Title><h2 style={{fontSize:"85px", color: "#14A44D"}}>MoneyPad</h2></Card.Title>
          <Card.Subtitle style={{fontSize: "45px"}} className="mb-2 text-muted">A Finance App to help with Budgeting, Investing, and Money Management.</Card.Subtitle>
          <Card.Text> <a style={{fontSize:"30px", color: "#14A44D"}}>By: Jackson Davis</a></Card.Text>
        </Card.Body>
      </Card>
    )
}

export default Landingpage