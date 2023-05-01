import React, { useState, useEffect } from "react";
import getUserInfo from '../../utilities/decodeJwt';
import taxCalculation from '../../utilities/taxCalculator';
import axios from "axios";
import AlertFunction from '../register/AlertMessage';
import { Card, Badge } from 'react-bootstrap';
import { link2 } from '../../utilities/api';
import "../register/loginPage.css"



const NotificationCard = () => {

  const [notiArray, setNotiArray] = useState([])

  const url = `${link2}/getCurrentYearTotals/${getUserInfo().user_id}`;

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

    var totalSpending = (data.debitRecurring.totalDebitsRecurring * 12) + data.debitNonRecurring.totalDebits
    var totalNeeds = (data.needRecurring.totalNeedsRecurring * 12) + data.needNonRecurring.totalNonRecurringNeeds
    var totalWants = (data.wantRecurring.totalWantsRecurring * 12)+ data.wantNonRecurring.totalNonRecurringWants
  
    if (totalSpending > (getUserInfo().income * .8) * taxCalculation(getUserInfo().income)) {
      notficationArray.push("You're spending more than your income! Cut down on spending.");
    } 

    if ((data.needRecurring.totalNeedsRecurring * 12) > (getUserInfo().income * .5) * taxCalculation(getUserInfo().income)) {
      notficationArray.push("Your monthly recurring NEEDs are too high, cut down on subscriptions.");
    } 
    
    if ((data.wantRecurring.totalWantsRecurring * 12) > (getUserInfo().income * .3) * taxCalculation(getUserInfo().income)) {
      notficationArray.push("Your monthly recurring WANTs are too high, do you really need that much stuff for subscriptions?");
    }

    if ((totalNeeds) > (getUserInfo().income * .5) * taxCalculation(getUserInfo().income)) {
      notficationArray.push("Your NEEDs are too high, please look at the pie chart for recommendations.");
    } 
    
    if ((totalWants) > (getUserInfo().income * .3) * taxCalculation(getUserInfo().income)) {
      notficationArray.push("Your WANTs are too high, it's not important, check the pie chart for recommendations.");
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