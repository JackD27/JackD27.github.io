import React, { useState, useEffect } from "react";
import axios from "axios";
import getUserInfo from '../../utilities/decodeJwt';
import {Button, Table} from 'react-bootstrap';
import TransactionComp from './transactionComp'
import "../register/loginPage.css"

const url = "http://localhost:8085/createTransaction";

const RecurringTransactionListComp = (props) => {
  const [user, setUser] = useState(null)
  const [list, setList] = useState([])
  const [error, setError] = useState({});

  useEffect(() => {
    async function getList() {
        
      const response = await fetch(`http://localhost:8085/recurringExpenses/${getUserInfo().user_id.toString()}`);
      
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      
      try{
      const fetchedList = await response.json();

      setList(fetchedList);  // update state.  when state changes, we automatically re-render.
      }catch(error){
        setError(error)
      }
      
    }
    
    getList();   
    setUser(getUserInfo())

    return; 
  }, [list.length]);  

  async function deleteTransactionItem(targetId) {
    const deleteTransaction = {
        transactionId: targetId,
      }
    const url = "http://localhost:8085/deleteTransaction";

    await axios.delete(url, {
        data: deleteTransaction,
      })
      
    // const newList = list.filter((el) => el !== el); // This causes a re-render because we change state. Helps cause a re-render.
    // setList(newList);  // This causes a re-render because we change state.
    window.location.reload();
  }


  function transactionList() {
    return list.slice(0, props.length).map((transaction) => {
      return (
        <TransactionComp show={props.show}
          name={transaction.name}
          date={transaction.date}
          description={transaction.description}
          price={transaction.price}
          recurring={transaction.recurring}
          category={transaction.category}
          category2={transaction.category2}
          onDeleteClickHandler={() => deleteTransactionItem(transaction.transaction_id)}
          key={transaction.transaction_id}
        />
      );
    });
  }


  return (
    <Table bordered hover style={{color: "white"}} size="sm">
        <thead>
        <tr>
          <th>Name</th>
          <th>Date</th>
          {props.show && <th>Description</th>}
          <th>Price</th>
          <th>Recurring</th>
          <th>Category</th>
          <th>Category2</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {transactionList()}
      </tbody>
    </Table>
  );
};

export default RecurringTransactionListComp;