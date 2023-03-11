import {Card} from 'react-bootstrap';
import { PieChart, Pie, Legend, Tooltip } from 'recharts';
import React, { useState, useEffect } from "react";
import getUserInfo from '../../utilities/decodeJwt';
import "../register/loginPage.css"

function PieGraphCard() {
  const [taxedPercent, setTaxedPercent] = useState(0)

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: "0",
  });


    
  function taxCalculation(person) {
    
  var taxPercent = 0
    if (person <= 10275) {
      taxPercent = .1
    }
    if (person >= 10276 && person <= 41775) {
      taxPercent = .12
    } if (person >= 41776 && person <= 89075) {
      taxPercent = .22
    } if (person >= 89076 && person <= 170050) {
      taxPercent = .24
    } if (person >= 170051 && person <= 215950) {
      taxPercent = .32
    }
    if (person >= 215951 && person <= 539900) {
      taxPercent = .35
    }
    if (person >= 539901) {
      taxPercent = .37
    }

    return 1 - taxPercent
  } 



    useEffect(() => {

        

        setTaxedPercent(taxCalculation(getUserInfo().income))
        
        return; 
    }, [taxedPercent.length]); 

  const data = [
    { name: `Needs (${getUserInfo().income * .5})`, value: getUserInfo().income * .5 },
    { name: `Savings (${getUserInfo().income * .2})`, value: getUserInfo().income * .2},
    { name: `Wants (${getUserInfo().income * .3})`, value: getUserInfo().income * .3 },
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
                <h4 style={{marginTop: "5px", color:"white"}}>Filed as Single ... Income after Taxes: {formatter.format(getUserInfo().income * taxedPercent)}</h4>
            </Card.Footer>
    </Card>
  );
}

export default PieGraphCard;