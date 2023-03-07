import React from "react";
import {Button, Table} from 'react-bootstrap';
import "../register/loginPage.css"


const ListComp = (props) => {

   const canShow = props.show;
   const canShowPercent = props.showPercent;

  const onDeleteClick = () => {
    props.onDeleteClickHandler();
      
  }

  
  const ListItem = ({ticker, date, price, shares, percentage, currPrice, profit}) => (
    <tr style={{color: "white"}}>
      <td>{ticker}</td>
      {canShowPercent && <td style={{color: percentage < 0 ? "red" : "green"}}>{percentage}%</td>}
      {canShow && <td>{date}</td>}
      <td>${price}</td>
      {canShow && <td>{shares}</td>}
      {canShow && <td>${currPrice}</td>}
      {canShow && <td>${profit}</td>}
      <td><Button size="sm" variant="danger" onClick={() => {onDeleteClick()}}>Delete</Button></td>
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