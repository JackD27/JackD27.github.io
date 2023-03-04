import React, { useState, useEffect } from "react";
import axios from "axios";
import getUserInfo from '../../utilities/decodeJwt';
import {Button, Table} from 'react-bootstrap';
import "../register/loginPage.css"


const ListComp = (props) => {

   const canShow = props.show;

  const onDeleteClick = () => {
    props.onDeleteClickHandler();
      
  }

  
  const ListItem = ({ticker, date, price, shares}) => (
    <tr style={{color: "white"}}>
      <td>{ticker}</td>
      <td>{date}</td>
      {canShow && <td>{price}</td>}
      {canShow && <td>{shares}</td>}
      <td><Button size="sm" variant="danger" onClick={() => {onDeleteClick()}}>Delete</Button></td>
    </tr>
  );

  function List() {
      return (
        <ListItem
          ticker={props.stockTicker}
          date={props.date}
          price={props.price}
          shares={props.shares}
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