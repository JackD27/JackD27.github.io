import React, { useState, useEffect } from "react";
import axios from "axios";
import getUserInfo from '../../utilities/decodeJwt';
import { key }from '../../utilities/api';
import { Table} from 'react-bootstrap';
import ListComp from './listComp'
import "../register/loginPage.css"

const BASE_URL = "https://finnhub.io/api/v1/quote?symbol=";
const KEY_URL = `&token=${key}`;

const testData = []; 


const WatchlistComp = (props) => {
  const [user, setUser] = useState(null)
  const [list, setList] = useState([])
  const [testData, setTestData] = useState([])
  const [error, setError] = useState({});
  const [stocksData, setStocksData] = useState([]);

  async function getList() {
        
    const response = await fetch(`http://localhost:8085/watchlistUser/${getUserInfo().user_id.toString()}`);
    
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    
    try{
    const fetchedList = await response.json();

    setList(fetchedList);  // update state.  when state changes, we automatically re-render.
    }catch(error){
      setError(error)
    }
    
  }


  useEffect(() => {
    setUser(getUserInfo())

    
    

    getList();   

    let promises = [];
    list.map((stock) => {
      promises.push(
        getStocksData(stock.stockTicker)
        .then((res) => {
          testData.push({
            name: stock,
            ...res.data
          });
        })
      )
    });

    Promise.all(promises).then(()=>{
      console.log(testData);
      setStocksData(testData);
    })
  }, []);  

  async function deleteTransactionItem(targetId) {
    const deleteWatchlistItem = {
        watchlistitem_id: targetId,
      }
    const url = "http://localhost:8085/deleteWatchlistItem";

    await axios.delete(url, {
        data: deleteWatchlistItem,
      })
      
    const newList = list.filter((el) => el !== el); // This causes a re-render because we change state. Helps cause a re-render.
    setList(newList);  // This causes a re-render because we change state.
    
}

 function getStocksData(stock) {
  return axios
    .get(`${BASE_URL}${stock}${KEY_URL}`)
    .catch((error) => {
      console.error("Error", error.message);
    });
};


  function watchlistList() {
    return testData.slice(0, props.length).map((watchlistItem) => {
      return (
        <ListComp show={props.show}
          stockTicker={watchlistItem.name.stockTicker}
          date={watchlistItem.date}
          price={watchlistItem.price}
          shares={watchlistItem.shares}
          onDeleteClickHandler={() => deleteTransactionItem(watchlistItem.name.watchlistitem_id)}
          key={watchlistItem.id}
        />
      );
    });
  }


  return (
    <Table bordered hover style={{color: "white"}} size="sm">
        <thead>
        <tr>
          <th>Ticker</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {watchlistList()}
      </tbody>
    </Table>
  );
};

export default WatchlistComp;