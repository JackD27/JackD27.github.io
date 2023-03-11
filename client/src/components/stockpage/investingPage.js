import React from "react";
import Container from 'react-bootstrap/Container';
import {Col, Row} from 'react-bootstrap';
import WatchlistCard from './watchListCard';
import StocklistCard from './stockOwnedCard';
import "../register/loginPage.css"

const InvestingPage = () => {


  return (
    <Container>
      <Row>
        <Col>
          <WatchlistCard />
        </Col>
        <Col>
          <StocklistCard />
        </Col>
      </Row>
    </Container>
  );
};

export default InvestingPage;