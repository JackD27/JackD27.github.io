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



const StockedOwnedComp = (props) => {
  
  const [list, setList] = useState([])
  const [stocksData, setStocksData] = useState([]);
  const [totalProfit, setTotalprofit] = useState(0);

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

        
    const response = await fetch(`${link2}/portfolioUser/${getUserInfo().user_id.toString()}`);
    
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    
    try{
    const fetchedList = await response.json();
    

    setList(fetchedList);  // update state.  when state changes, we automatically re-render.
    list.map((item)=>{
      promises.push(
        getStocksData(item.stockTicker).then((res) => {
          tempData.push({
            name: item.stockTicker,
            date: item.dateBoughtAt,
            priceWhenBought: item.priceWhenBought,
            shares: item.shares,
            info: res.data,
            id: item.portfolioitem_id,
          });
        })
      );
    })
    Promise.all(promises).then(()=>{
      setStocksData(tempData);
    })
    
    }catch(error){
      
    }
    
  }

  async function getNumber() {
    let sum = 0

    stocksData.slice(0, props.length).map((watchlistItem) => {
      let currPriceBought;
      if (watchlistItem.info.c === undefined || watchlistItem.info.c === null || watchlistItem.info.c === 0) {
        currPriceBought = 0
      }else{
        currPriceBought = watchlistItem.priceWhenBought
      }
      
      const profit = (watchlistItem.info.c * watchlistItem.shares) - (currPriceBought * watchlistItem.shares)
      sum += parseFloat(profit);
      setTotalprofit(Number(sum).toFixed(2))
    })};
  


  useEffect(() => {
    
    getList();

     
    

  }, [list.length]);  

  useEffect(() => {
    getNumber();
}, [stocksData.length]);

  async function deleteStockPortfolioItem(targetId) {
    const deletePortfolioItem = {
        portfolioitem_id: targetId,
      }
    const url = `${link2}/deletePortfolioItem`;

    await axios.delete(url, {
        data: deletePortfolioItem,
      })
      
    
    const newList = list.filter((el) => el.id !== el.id); // This causes a re-render because we change state. Helps cause a re-render.
    setList(newList);  // This causes a re-render because we change state.
    
}
  function stockPortfolioList() {
    return stocksData.slice(0, props.length).map((watchlistItem) => {
      let currPriceBought;
      if (watchlistItem.info.c === undefined || watchlistItem.info.c === null || watchlistItem.info.c === 0) {
        currPriceBought = 0
      }else{
        currPriceBought = watchlistItem.priceWhenBought
      }
      const profit = (watchlistItem.info.c * watchlistItem.shares) - (currPriceBought * watchlistItem.shares)
      return (
        <ListComp show={props.show}
          stockTicker={watchlistItem.name}
          date={watchlistItem.date}
          delete={props.delete}
          price={watchlistItem.priceWhenBought}
          currPrice={watchlistItem.info.c}
          //percentage={Number(percent).toFixed(2)}
          shares={watchlistItem.shares}
          profit={Number(profit).toFixed(2)}
          onDeleteClickHandler={() => deleteStockPortfolioItem(watchlistItem.id)}
          key={watchlistItem.id}
          
        />
      );
    });
  }


  return (
    <>
    <h4 style={{marginTop: "5px", color:"white"}}>Total Profit: ${totalProfit}</h4>
    <Table bordered hover style={{color: "white"}} size="sm">
        <thead>
        <tr>
          <th>Ticker</th>
          <th>Date Purchased</th>
          <th>Price When Bought</th>
          <th>Shares</th>
          <th>Current Price</th>
          <th>Profit</th>
          {props.delete && <th>Delete</th>}
        </tr>
      </thead>
      <tbody>
        {stockPortfolioList()}
      </tbody>
    </Table>
  </>
  );
};

export default StockedOwnedComp;