import React from "react";
import {Button} from 'react-bootstrap';
import "../register/loginPage.css"


const TransactionComp = (props) => {

   const canShow = props.show;

  const onDeleteClick = () => {
    props.onDeleteClickHandler();
      
  }

  
  const Transaction = ({name, date, description, price, recurring, category, category2}) => (
    <tr style={{color: "white"}}>
      <td>{name}</td>
      <td>{date}</td>
      {canShow && <td>{description}</td>}
      <td>${price}</td>
      {/* <td>{recurring}</td> */}
      <td>{category}</td>
      <td>{category2}</td>
      {canShow && <td><Button size="sm" variant="danger" onClick={() => {onDeleteClick()}}>Delete</Button></td>}
    </tr>
  );

  function transactionList() {
      return (
        <Transaction
          name={props.name}
          date={props.date}
          description={props.description}
          price={props.price}
          recurring={props.recurring}
          category={props.category}
          category2={props.category2}
          onDelete={() => onDeleteClick(props.transaction_id)}
          key={props.transaction_id}
        />
      );
    }

  return (
    <>{transactionList()}</>
  );
};

export default TransactionComp;