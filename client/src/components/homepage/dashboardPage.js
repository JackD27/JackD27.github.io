import React, { useState, useEffect } from "react";
import getUserInfo from '../../utilities/decodeJwt';
import Container from 'react-bootstrap/Container';
import {Col, Row} from 'react-bootstrap';
import RecentTransactionCard from './recentTransactionCard';
import MonthlyExpensesCard from './recurringExpensesCard';
import "../register/loginPage.css"

const url = "http://localhost:8085/createTransaction";

const DashboardPage = () => {

  const [user, setUser] = useState(null)

  useEffect(() => {

    setUser(getUserInfo())

  }, []);


  return (
    <Container>
      <Row>
        <Col>
          <RecentTransactionCard />
        </Col>
        <Col>
          <MonthlyExpensesCard />
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;