import {Card} from 'react-bootstrap';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';
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

    let needsData = Math.round(getUserInfo().income * .5 * taxedPercent)
    let savingsData = Math.round(getUserInfo().income * .2 * taxedPercent)
    let wantsData = Math.round(getUserInfo().income * .3 * taxedPercent)

  const data = [
    { name: `Needs: $${needsData.toLocaleString()}`, value: needsData },
    { name: `Savings: $${savingsData.toLocaleString()}`, value: savingsData},
    { name: `Wants: $${wantsData.toLocaleString()}`, value: wantsData},
  ];

  const COLORS = ['#14A44D', '#24B18D', '#0088FE'];

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  
  return (
    <Card className="text-center" style={{ background: "rgb(50,58,69)" }}>
      <Card.Header>
        <h2 style={{ color: "#14A44D" }}>Pie Graph</h2>
      </Card.Header>
      <Card.Body style={{ color: "white" }}>
        <PieChart width={600} height={260}>
          <Pie
          
            data={data}
            cx={"50%"}
            cy={"50%"}
            // innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={renderCustomizedLabel}
            labelLine={false}
            >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
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