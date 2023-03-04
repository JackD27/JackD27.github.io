import React, { useState, useEffect } from "react";
import axios from "axios";
import getUserInfo from '../../utilities/decodeJwt';
import {Button, Table} from 'react-bootstrap';
import ListComp from './listComp'
import "../register/loginPage.css"

const url = "http://localhost:8085/createTransaction";

const WatchlistComp = (props) => {
  const [user, setUser] = useState(null)
  const [list, setList] = useState([])
  const [error, setError] = useState({});

  useEffect(() => {
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
    
    getList();   
    setUser(getUserInfo())
    console.log(list)

    return; 
  }, [list.length]);  

  async function deleteTransactionItem(targetId) {
    const deleteWatchlistItem = {
        watchlist_id: targetId,
      }
    const url = "http://localhost:8085/deleteWatchlistItem";

    await axios.delete(url, {
        data: deleteWatchlistItem,
      })
      
    //   const newList = list.filter((el) => el !== el); // This causes a re-render because we change state. Helps cause a re-render.
    // setList(newList);  // This causes a re-render because we change state.
    window.location.reload();
}


  function watchlistList() {
    return list.slice(0, props.length).map((watchlistItem) => {
      return (
        <ListComp show={props.show}
          ticker={watchlistItem.stockTicker}
          date={watchlistItem.date}
          price={watchlistItem.price}
          shares={watchlistItem.shares}
          onDeleteClickHandler={() => deleteTransactionItem(watchlistItem.watchlistitem_id)}
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
          <th>Date</th>
          <th>Price</th>
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