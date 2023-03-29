import React from "react";
import getUserInfo from '../../utilities/decodeJwt';
import AlertFunction from '../register/AlertMessage';
import {Card} from 'react-bootstrap';
import "../register/loginPage.css"



const NotificationCard = () => {

    const Notification = ({message}) => (
        <AlertFunction variant="danger" show={true} message={message}/>
      );

      function notificationList() {
        return (<>
          <Notification message={"You're Overspending!"}/>
          <Notification message={"You are in debt!"}/>
          <Notification message={"Work in progress!"}/>
          </>
        );
      }

  return (
          <Card className="text-center"style={{ background: "rgb(50,58,69)", marginTop: "15px"}}>
            <Card.Header>
              <h2 style={{ color: "#14A44D" }}>Notifications</h2>
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