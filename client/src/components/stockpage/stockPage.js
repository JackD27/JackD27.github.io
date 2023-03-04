import React, { useState, useEffect } from "react";
import getUserInfo from '../../utilities/decodeJwt';
import Container from 'react-bootstrap/Container';
import {Col, Row} from 'react-bootstrap';
import WatchlistCard from './watchListCard';
import "../register/loginPage.css"

const StockPage = () => {

  const [user, setUser] = useState(null)

  useEffect(() => {

    setUser(getUserInfo())

  }, []);


  return (
    <Container>
      <Row>
        <Col>
          <WatchlistCard />
        </Col>
      </Row>
    </Container>
  );
};

export default StockPage;