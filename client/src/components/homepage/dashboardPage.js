import React, { useState, useEffect } from "react";
import getUserInfo from '../../utilities/decodeJwt';
import Container from 'react-bootstrap/Container';
import {Col, Row} from 'react-bootstrap';
import RecentTransactionCard from './recentTransactionCard';
import MonthlyExpensesCard from './recurringExpensesCard';
import RecommendationCard from './recommendationCard';
import "../register/loginPage.css"

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
      <Row>
      <Col>
          <RecentTransactionCard />
        </Col>
        <Col>
          <RecommendationCard />
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;