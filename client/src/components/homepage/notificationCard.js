import React, { useState, useEffect } from "react";
import getUserInfo from '../../utilities/decodeJwt';
import taxCalculation from '../../utilities/taxCalculator';
import axios from "axios";
import AlertFunction from '../register/AlertMessage';
import {Card, Badge} from 'react-bootstrap';
import "../register/loginPage.css"



const NotificationCard = () => {

  let yo = 1000;

  const [taxedPercent, setTaxedPercent] = useState(0)
  const [number, setNumber] = useState(0)
  const [notiArray, setNotiArray] = useState([])

  const url = `http://localhost:8085/getCurrentYearTotals/${getUserInfo().user_id}`;


  async function getNumber(){
    axios.get(url).then(({ data }) => {
      setNumber(data);
    }).catch((err) => {console.log(err)});
  }

  useEffect(() => {
    
  
    getNumber()

   
  }, [number.length]); 

  useEffect(() => {
    setTaxedPercent(taxCalculation(getUserInfo().income))
  
    
    showNotifications()
   
  }, [taxedPercent.length]); 


    

    const Notification = ({message}) => (
        <AlertFunction variant="danger" show={true} message={message}/>
      );

    async function showNotifications(){



      let notficationArray = []
      if(number.debitTotal.totalDebits > getUserInfo().income * taxedPercent){
        notficationArray.push("You're spending more than your income!");
      }if (number.needTotal.totalNeeds * 12 * .5 > getUserInfo().income * .5 * taxedPercent){
       notficationArray.push("Your monthly recurring NEEDs are too high, cut down on spending.");
      }if (number.wantTotal.totalWants * 12 * .3 > getUserInfo().income * .3 * taxedPercent){
      notficationArray.push("Your monthly recurring WANTs are too high, do you really need that much stuff when it's not useful?");
      }

      setNotiArray(notficationArray)
    }

      function notificationList() {
        return notiArray.map((notification) => {
          return (
            <Notification message={notification}
            />
          );
        });
      }

     function notiBadge(){
      if (notiArray.length > 0){
        return <Badge bg="danger">{notiArray.length}</Badge>
        }else{
          return <></>
        }
      }

      

  return (
          <Card className="text-center"style={{ background: "rgb(50,58,69)", marginTop: "15px"}}>
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