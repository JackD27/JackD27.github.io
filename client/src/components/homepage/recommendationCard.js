import React from "react";
import getUserInfo from '../../utilities/decodeJwt';
import {Card} from 'react-bootstrap';
import "../register/loginPage.css"



const RecommendationCard = () => {

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: "0",
      });

  return (
          <Card className="text-center"style={{ background: "rgb(50,58,69)", marginTop: "15px"}}>
            <Card.Header>
              <h2 style={{ color: "#14A44D" }}>Recommendations</h2>
            </Card.Header>
            <Card.Body>
                <h4 style={{ color: "white" }}>Max Car Price: {formatter.format(getUserInfo().income * .35)}</h4>
                <h4 style={{ color: "white" }}>Max House Price: {formatter.format(getUserInfo().income * 5)}</h4>
            </Card.Body>
            <Card.Footer>
            </Card.Footer>
          </Card>
  );
};

export default RecommendationCard;