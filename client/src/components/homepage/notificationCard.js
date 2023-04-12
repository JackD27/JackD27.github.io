import React, { useState, useEffect } from "react";
import getUserInfo from '../../utilities/decodeJwt';
import taxCalculation from '../../utilities/taxCalculator';
import axios from "axios";
import AlertFunction from '../register/AlertMessage';
import { Card, Badge } from 'react-bootstrap';
import "../register/loginPage.css"



const NotificationCard = () => {

  const [notiArray, setNotiArray] = useState([])

  const url = `http://localhost:8085/getCurrentYearTotals/${getUserInfo().user_id}`;

  useEffect(  () => {
     axios.get(url).then(({ data }) => {      
      
      showNotifications(data)
    }).catch((err) => { console.log(err) });

  }, []);

  const Notification = ({ message }) => (
    <AlertFunction variant="danger" show={true} message={message} />
  );

  async function showNotifications(data) {
    let notficationArray = []
  
    if (data.debitTotal.totalDebits > getUserInfo().income * taxCalculation(getUserInfo().income)) {
      notficationArray.push("You're spending more than your income!");
    } 

    if (data.needTotal.totalNeeds * 12 * .5 > getUserInfo().income * .5 * taxCalculation(getUserInfo().income)) {
      notficationArray.push("Your monthly recurring NEEDs are too high, cut down on spending.");
    } 
    
    if (data.wantTotal.totalWants * 12 * .3 > getUserInfo().income * .3 * taxCalculation(getUserInfo().income)) {
      notficationArray.push("Your monthly recurring WANTs are too high, do you really need that much stuff when it's not useful?");
    }
    setNotiArray(notficationArray);
  }

  function notificationList() {
    if(notiArray.length > 0){
      return notiArray.map((notification, idx) => {
        return (
          <Notification message={notification} key={idx}
          />
        );
      });
    }
  }

  function notiBadge() {
    if (notiArray.length > 0) {
      return <Badge bg="danger">{notiArray.length}</Badge>
    } else {
      return <></>
    }
  }



  return (
    <Card className="text-center" style={{ background: "rgb(50,58,69)"}}>
      <Card.Header>
        <h2 style={{ color: "#14A44D" }}>Notifications {notiBadge()}</h2>
      </Card.Header>
      <Card.Body>
        <>{notificationList()}</>
      </Card.Body>
      <Card.Footer>
      </Card.Footer>
    </Card>
  );
};

export default NotificationCard;