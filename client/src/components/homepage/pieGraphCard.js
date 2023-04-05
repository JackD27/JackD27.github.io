import {Card} from 'react-bootstrap';
import { PieChart, Pie, Legend, Tooltip } from 'recharts';
import React, { useState, useEffect } from "react";
import getUserInfo from '../../utilities/decodeJwt';
import taxCalculation from '../../utilities/taxCalculator';
import "../register/loginPage.css"

function PieGraphCard() {
  const [taxedPercent, setTaxedPercent] = useState(0)

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: "0",
  });

    useEffect(() => {
      
        setTaxedPercent(taxCalculation(getUserInfo().income))
        
        return; 
    }, [taxedPercent.length]); 

  const data = [
    { name: `Needs (${getUserInfo().income * .5 * taxedPercent})`, value: getUserInfo().income * .5 * taxedPercent },
    { name: `Savings (${getUserInfo().income * .2 * taxedPercent})`, value: getUserInfo().income * .2 * taxedPercent},
    { name: `Wants (${getUserInfo().income * .3 * taxedPercent})`, value: getUserInfo().income * .3 * taxedPercent },
  ];

  
  return (
    <Card className="text-center" style={{ background: "rgb(50,58,69)" }}>
      <Card.Header>
        <h2 style={{ color: "#14A44D" }}>Pie Graph</h2>
      </Card.Header>
      <Card.Body style={{ color: "white" }}>
        <PieChart width={600} height={260}>
          <Pie
            data={data}
            cx={300}
            cy={120}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label
          />
          <Tooltip />
          <Legend />
        </PieChart>
      </Card.Body>
      <Card.Footer>
                <h4 style={{marginTop: "5px", color:"white"}}>Yearly Income: {formatter.format(getUserInfo().income)}</h4>
                <h4 style={{marginTop: "5px", color:"white"}}>Income after Taxes (Single): {formatter.format(getUserInfo().income * taxedPercent)}</h4>
            </Card.Footer>
    </Card>
  );
}

export default PieGraphCard;