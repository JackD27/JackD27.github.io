import React, {useState, useEffect} from "react";
import {Card} from 'react-bootstrap';
import "../register/loginPage.css"
import {link2} from '../../utilities/api';
import getUserInfo from '../../utilities/decodeJwt';
import RecommendationStatsComp from "./recommendationStatsComp";

const RecommendationCard = () => {
    const [list, setList] = useState([])

    async function getList() {
            
        const response = await fetch(`${link2}/watchlistUser/${getUserInfo().user_id.toString()}`);
        
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
        
        try{
        const fetchedList = await response.json();
        
    
        setList(fetchedList);  
        
        }catch(error){
          
        }
        
      }

      useEffect(() => {

        getList(); 

    
      }, [list.length]);  

    const [values, setValues] = useState({
        stockName: "AAPL",
      });


      const onChange = async (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };

  return (
          <Card className="text-center"style={{ background: "rgb(50,58,69)"}}>
            <Card.Header>
              <h2 style={{ color: "#14A44D" }}>Stock Recommendations</h2>
              <select style={{marginTop: "5px"}} name="stockName"onChange={onChange}>
                {list.map((input, i) =>(
                <option key={i}>{input.stockTicker}</option>
          ))}
        </select>
            </Card.Header>
            <Card.Body>
                <RecommendationStatsComp name={values.stockName}/>
            </Card.Body>
            <Card.Footer>
            </Card.Footer>
          </Card>
  );
};

export default RecommendationCard;