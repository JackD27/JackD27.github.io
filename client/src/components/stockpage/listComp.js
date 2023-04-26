import React from "react";
import {Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "../register/loginPage.css"


const ListComp = (props) => {

   const canShow = props.show;
   const canDelete = props.delete;
   const canShowPercent = props.showPercent;

  const onDeleteClick = () => {
    props.onDeleteClickHandler();
      
  }
  
  const ListItem = ({ticker, date, price, shares, percentage, currPrice, profit}) => (
    <tr style={{color: "white"}} >
      <td><Link to={`https://finance.yahoo.com/quote/${ticker}`} style={{ textDecoration: 'none', color: 'white'}}>{ticker}</Link></td>
      {canShowPercent && <td style={{color: percentage < 0 ? "orangered" : "lightgreen"}}>{percentage}%</td>}
      {canShow && <td>{date}</td>}
      <td>${Number(price).toFixed(2)}</td>
      {canShow && <td>{shares}</td>}
      {canShow && <td>${Number(currPrice).toFixed(2)}</td>}
      {canShow && <td>${profit}</td>}
      {canDelete && <td><Button size="sm" variant="danger" onClick={() => {onDeleteClick()}}>Delete</Button></td>}
    </tr>
  );

  function List() {
      return (
        <ListItem
          ticker={props.stockTicker}
          date={props.date}
          price={props.price}
          currPrice={props.currPrice}
          percentage={props.percentage}
          shares={props.shares}
          profit={props.profit}
          onDelete={() => onDeleteClick(props.id)}
          key={props.id}
        />
      );
    }

  return (
    <>{List()}</>
  );
};

export default ListComp;