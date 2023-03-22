import React from "react";
import ExpenseList from './recurringExpensesCard';
import "../register/loginPage.css"

const RecurringExpensePage = () => {

  return (
  <ExpenseList padding={"600px"} show={true} length="20"></ExpenseList>
  );
};

export default RecurringExpensePage;