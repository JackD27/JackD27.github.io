import React from "react";
import Container from 'react-bootstrap/Container';
import {Col, Row} from 'react-bootstrap';
import RecentTransactionCard from './recentTransactionCard';
import MonthlyExpensesCard from './recurringExpensesCard';
import RecommendationCard from './recommendationCard';
import PieGraphCard from './pieGraphCard';
import "../register/loginPage.css"

const DashboardPage = () => {

  return (
    <Container>
      <Row>
        <Col>
          <PieGraphCard />
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