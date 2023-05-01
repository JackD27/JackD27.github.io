import React, { useEffect, useState } from "react";
import getUserInfo from '../../utilities/decodeJwt';
import { Button} from 'react-bootstrap'
import axios from "axios";
import { Table, Modal} from 'react-bootstrap';
import "../register/loginPage.css"

// Here, we display our Navbar
export default function AdminPage() {

  const url = 'http://localhost:8085/users';
  

  const [user, setUser] = useState({})
  const [listUsers, setListUsers] = useState([])

  async function adminUser(userInfo) {

    const addAdmin = {
      userId: userInfo.user_id,
      tradingType: 1,
    }
    const url = "http://localhost:8085/updateUserTradingInfo";

    const res = await axios.post(url, addAdmin)
    getUsers()

  }


  async function unadminUser(userInfo) {

    const unAdmin = {
      userId: userInfo.user_id,
      tradingType: 0,
    }
    const url = "http://localhost:8085/updateUserTradingInfo";

    const res = await axios.post(url, unAdmin)
    

    getUsers()

  }

  useEffect(() => {
    setUser(getUserInfo())
  }, [])

  async function getUsers() {
    try{
    const data = await axios.get(url);
    const info = data.data;
    setListUsers(info);

  } catch (error) {
    console.log("Error: " + error);
  }
}

  useEffect(() => {

    getUsers(); 


  }, [listUsers.length]);  

  useEffect(() => {

    getUsers(); 


  }, [listUsers.tradingType]);  

  async function deleteWatchlistItem(targetId) {
    const deleteWatchlistItem = {
        userId: targetId,
      }
    const url = "http://localhost:8085/deleteUser";

    await axios.delete(url, {
        data: deleteWatchlistItem,
      })

      const newList = listUsers.filter((el) => el.user_id !== targetId); // This causes a re-render because we change state. Helps cause a re-render.
      setListUsers(newList);  // This causes a re-render because we change state.
      

}

  function usersList() {
    return listUsers.map((userPerson) => {
      return (
        <>
        
          <tr style={{background:"rgb(50,58,69)"}}>
          <td>{userPerson.username}</td>
          <td>{userPerson.email}</td>
          <td>${Number(userPerson.income).toLocaleString()}</td>
          {userPerson.user_id !== 374 ? <>{userPerson.tradingType === 0 ? <td><Button size="sm" variant="secondary" onClick={() => {adminUser(userPerson)}}>Promote to Admin</Button></td> : <td><Button size="sm" variant="secondary" onClick={() => {unadminUser(userPerson)}}>Demote From Admin</Button></td>}</> : "The Creator!"}
          <td>{userPerson.user_id !== 374 && userPerson.user_id !== user.user_id ? <Button size="sm" variant="danger" onClick={() => {deleteWatchlistItem(userPerson.user_id)}}>Delete: {userPerson.user_id}</Button>: null}</td>
        </tr>
        </>
      );
    });
  }


  if(user && user.tradingType === 1){
    return (<>
    <h3 style={{textAlign: 'center'}}>{listUsers.length} Users have signed up.</h3>
    <Table bordered hover style={{background: "rgb(50,58,69)",color: "white", textAlign:"center"}} size="sm">
        <thead>
        <tr style={{color: "#14A44D"}}>
          <th>Username</th>
          <th>Email</th>
          <th>Income</th>
          <th>Admin</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {usersList()}
      </tbody>
    </Table>
    </>)
  
}}





