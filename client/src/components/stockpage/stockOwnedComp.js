import React, { useState, useEffect } from "react";
import axios from "axios";
import getUserInfo from '../../utilities/decodeJwt';
import { key }from '../../utilities/api';
import { Table} from 'react-bootstrap';
import ListComp from './listComp'
import "../register/loginPage.css"

const BASE_URL = "https://finnhub.io/api/v1/quote?symbol=";
const KEY_URL = `&token=${key}`;



const StockedOwnedComp = (props) => {
  const [user, setUser] = useState(null)
  const [list, setList] = useState([])
  const [error, setError] = useState({});
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

        
    const response = await fetch(`http://localhost:8085/portfolioUser/${getUserInfo().user_id.toString()}`);
    
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
      setError(error)
    }
    
  }


  useEffect(() => {
    setUser(getUserInfo())


    getList(); 
    

  }, [list.length]);  

  async function deleteStockPortfolioItem(targetId) {
    const deletePortfolioItem = {
        portfolioitem_id: targetId,
      }
    const url = "http://localhost:8085/deletePortfolioItem";

    await axios.delete(url, {
        data: deletePortfolioItem,
      })
      
    
    const newList = list.filter((el) => el.id !== el.id); // This causes a re-render because we change state. Helps cause a re-render.
    setList(newList);  // This causes a re-render because we change state.
    
}




  function stockPortfolioList() {
    return stocksData.slice(0, props.length).map((watchlistItem) => {
      const percent = ((watchlistItem.info.c - watchlistItem.info.o) / watchlistItem.info.o) * 100
      const profit = (watchlistItem.info.c * watchlistItem.shares) - (watchlistItem.priceWhenBought * watchlistItem.shares)
      return (
        <ListComp show={props.show}
          stockTicker={watchlistItem.name}
          date={watchlistItem.date}
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
    <Table bordered hover style={{color: "white"}} size="sm">
        <thead>
        <tr>
          <th>Ticker</th>
          <th>Date Purchased</th>
          <th>Price When Bought</th>
          <th>Shares</th>
          <th>Current Price</th>
          <th>Profit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {stockPortfolioList()}
      </tbody>
    </Table>
  );
};

export default StockedOwnedComp;