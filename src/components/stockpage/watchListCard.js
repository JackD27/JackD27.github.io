import React from "react";
import {Button, Card} from 'react-bootstrap';
import WatchListComp from './watchListComp';
import { useNavigate } from "react-router-dom";
import "../register/loginPage.css"

const WatchlistCard = () => {

const navigate = useNavigate();

  return (
          <Card className="text-center"style={{ background: "rgb(50,58,69)" }}>
            <Card.Header>
              <h2 style={{ color: "#14A44D" }}>Watchlist</h2>
              <Button variant="outline-success" style={{color: "white"}} onClick={() => navigate("/addWatchlist")}>+</Button>
            </Card.Header>
            <Card.Body>
              <WatchListComp length="7" show={false} showPercent={true} delete={false}/>
            </Card.Body>
            <Card.Footer>
                <Button variant="outline-success" style={{color: "white"}} onClick={() => navigate("/allWatchlist")}>View and Edit Whole Watchlist</Button>
            </Card.Footer>
          </Card>
  );
};

export default WatchlistCard;