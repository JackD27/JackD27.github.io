import React, { useState, useEffect } from "react";
import axios from "axios";
import getUserInfo from '../../utilities/decodeJwt';
import {Table} from 'react-bootstrap';
import TransactionComp from './transactionComp'
import {link2} from '../../utilities/api';
import "../register/loginPage.css"

const RecurringTransactionListComp = (props) => {
  const [list, setList] = useState([])
  const [list2, setList2] = useState([])

  async function getList() {
        
    const response = await fetch(`${link2}/recurringExpenses/${getUserInfo().user_id.toString()}`);
    
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
      
    const response = await fetch(`${link2}/transactionUser/${getUserInfo().user_id.toString()}`);
    
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

  const url = `${link2}/recurringExpenses/${getUserInfo().user_id}`;

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

  const [number2, setNumber2] = useState(0)

  const url2 = `${link2}/getCurrentYearTotals/${getUserInfo().user_id}`;

  async function getNumber2() {
      const data = await axios.get(url2);
      const info = data.data;
      setNumber2(info);
  }


    useEffect(() => {

        getNumber() 
        getNumber2() 
        // eslint-disable-next-line 
        console.log(Object.keys(number2).length)
    }, [number.length]);  

  useEffect(() => {
    
    getList();   

  }, [list.length]);  

  async function deleteTransactionItem(targetId) {
    const deleteTransaction = {
        transactionId: targetId,
      }
    const url = `${link2}/deleteTransaction`;

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
    getNumber2()
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

  const YearlyTotals = () => {
    if (Object.keys(number2).length > 5){
    return <h4 style={{ color: "white" }}>
      $
      {Number(
        number2.debitRecurring.totalDebitsRecurring * 12 +
          number2.debitNonRecurring.totalDebits
      ).toLocaleString()}{" "}
      Total Spending | ${Number(number2.needRecurring.totalNeedsRecurring * 12 +
          number2.needNonRecurring.totalNonRecurringNeeds).toLocaleString()} Total Needs
      | ${Number(number2.wantRecurring.totalWantsRecurring * 12 +
          number2.wantNonRecurring.totalNonRecurringWants).toLocaleString()} Total Wants
    </h4>}
    else{
      return null
    }
  };


  return (
    <>{<YearlyTotals></YearlyTotals>}
    {props.switch ? <h5 style={{color:"white"}}>${Number(number).toLocaleString()} Recurring Monthly | ${Number(number * 12).toLocaleString()} Recurring Yearly</h5>: null}
    {props.switch ? <h5 style={{color:"white"}}>${Number(number2.needRecurring.totalNeedsRecurring * 12).toLocaleString()} Recurring Yearly Needs | ${Number(number2.wantRecurring.totalWantsRecurring * 12).toLocaleString()} Recurring Yearly Wants</h5>: null}
    <Table bordered hover style={{color: "white"}} size="sm">
        <thead>
        <tr>
          <th>Name</th>
          <th>Date</th>
          {props.show && <th>Description</th>}
          <th>Price</th>
          <th>Category</th>
          <th>Category2</th>
          {props.show && <th>Delete</th>}
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