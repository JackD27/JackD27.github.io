import React, { useState, useEffect } from "react";
import axios from "axios";
import getUserInfo from '../../utilities/decodeJwt';
import {Table} from 'react-bootstrap';
import TransactionComp from './transactionComp'
import "../register/loginPage.css"

const RecurringTransactionListComp = (props) => {
  const [list, setList] = useState([])
  const [list2, setList2] = useState([])

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
      
    }
    
  }

  async function getList2() {
      
    const response = await fetch(`http://localhost:8085/transactionUser/${getUserInfo().user_id.toString()}`);
    
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    
    try{
    const fetchedList = await response.json();

    setList2(fetchedList);  // update state.  when state changes, we automatically re-render.
    }catch(error){
      
    }
    
  }

  useEffect(() => {
    
    getList2();   
    

    return; 
  }, [list2.length]); 

  const [number, setNumber] = useState(0)

  const url = `http://localhost:8085/recurringExpenses/${getUserInfo().user_id}`;

  async function getNumber() {
    axios
      .get(url)
      .then(({ data }) => {
          var sum = 0;
          data.forEach(transaction => {
              
              sum += parseFloat(transaction.price);
          });
          setNumber(sum.toFixed(2))
      })
      .catch((err) => {});
  }


    useEffect(() => {

        getNumber() 
        // eslint-disable-next-line 
    }, [number.length]);  

  useEffect(() => {
    
    getList();   

  }, [list.length]);  

  async function deleteTransactionItem(targetId) {
    const deleteTransaction = {
        transactionId: targetId,
      }
    const url = "http://localhost:8085/deleteTransaction";

    await axios.delete(url, {
        data: deleteTransaction,
      })
      
      // eslint-disable-next-line 
    const newList = list.filter((el) => el !== el); // This causes a re-render because we change state. Helps cause a re-render.
    setList(newList);  // This causes a re-render because we change state.
    // eslint-disable-next-line 
    const newList2 = list2.filter((el) => el !== el); // This causes a re-render because we change state. Helps cause a re-render.
    setList2(newList2);  // This causes a re-render because we change state.
    getNumber()
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

  function transactionList2() {
    return list2.slice(0, props.length).map((transaction) => {
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
    <>{props.switch ? <h4 style={{marginTop: "5px", color:"white"}}>${number} Monthly | ${number * 12} Yearly</h4>: null}
    <Table bordered hover style={{color: "white"}} size="sm">
        <thead>
        <tr>
          <th>Name</th>
          <th>Date</th>
          {props.show && <th>Description</th>}
          <th>Price</th>
          <th>Category</th>
          <th>Category2</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {props.switch ? transactionList() : transactionList2()}
      </tbody>
    </Table>
    </>
  );
};

export default RecurringTransactionListComp;