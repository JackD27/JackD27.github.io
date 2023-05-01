import React from "react";
import Container from 'react-bootstrap/Container';
import {Col, Row} from 'react-bootstrap';
import MonthlyExpensesCard from './recurringExpensesCard';
import RecommendationCard from './recommendationCard';
import NotificationCard from './notificationCard';
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
          <NotificationCard />
          <RecommendationCard />
        </Col>
      </Row>
      <Row style={{marginTop:"15px"}}>
          <MonthlyExpensesCard length="5"/>
      </Row>
    </Container>
  );
};

export default DashboardPage;