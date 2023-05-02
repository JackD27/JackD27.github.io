import React, { useState, useEffect } from "react";
import axios from "axios";
import getUserInfo from '../../utilities/decodeJwt';
import { key }from '../../utilities/api';
import { Table} from 'react-bootstrap';
import ListComp from './listComp'
import {link2} from '../../utilities/api';
import "../register/loginPage.css"

const BASE_URL = "https://finnhub.io/api/v1/quote?symbol=";
const KEY_URL = `&token=${key}`;

const WatchlistComp = (props) => {
  const [list, setList] = useState([])
  const [stocksData, setStocksData] = useState([]);

  const getStocksData = (stock) => {
    return axios
      .get(`${BASE_URL}${stock}${KEY_URL}`)
      .catch((error) => {
        console.error("Error", error.message);
      });
  };

  async function getList() {

    let tempData = []
    let promises = []

        
    const response = await fetch(`${link2}/watchlistUser/${getUserInfo().user_id.toString()}`);
    
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    
    try{
    const fetchedList = await response.json();
    

    setList(fetchedList);  // update state.  when state changes, we automatically re-render.
    list.map((item)=>{
      promises.push(getStocksData(item.stockTicker).then(res =>{
        tempData.push({name: item.stockTicker, info: res.data, id: item.watchlistitem_id})
      }))
    })
    Promise.all(promises).then(()=>{
      setStocksData(tempData);
    })
    
    }catch(error){
      
    }
    
  }


  useEffect(() => {

    getList(); 


  }, [list.length]);  

  async function deleteWatchlistItem(targetId) {
    const deleteWatchlistItem = {
        watchlistitem_id: targetId,
      }
    const url = `${link2}/deleteWatchlistItem`;

    await axios.delete(url, {
        data: deleteWatchlistItem,
      })

      const newList = list.filter((el) => el.watchlistitem_id !== targetId); // This causes a re-render because we change state. Helps cause a re-render.
      setList(newList);  // This causes a re-render because we change state.
}

  function watchlistList() {
    return stocksData.slice(0, props.length).map((watchlistItem) => {
      const percent = ((watchlistItem.info.c - watchlistItem.info.pc) / watchlistItem.info.pc) * 100
      return (
        <ListComp show={props.show}
        showPercent={props.showPercent}
          stockTicker={watchlistItem.name}
          delete={props.delete}
          date={watchlistItem.date}
          price={watchlistItem.info.c}
          percentage={Number(percent).toFixed(2)}
          shares={watchlistItem.shares}
          onDeleteClickHandler={() => deleteWatchlistItem(watchlistItem.id)}
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
          <th>Percentage Change of Day</th>
          <th>Current Price</th>
          {props.delete && <th>Delete</th>}
        </tr>
      </thead>
      <tbody>
        {watchlistList()}
      </tbody>
    </Table>
  );
};

export default WatchlistComp;