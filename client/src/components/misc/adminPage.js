import React, { useEffect, useState } from "react";
import getUserInfo from '../../utilities/decodeJwt';
import { Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { key }from '../../utilities/api';
import { Table} from 'react-bootstrap';
import ListComp from '../stockpage/listComp'
import "../register/loginPage.css"

// Here, we display our Navbar
export default function NavbarFunction() {

  const url = 'http://localhost:8085/users';

  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const [listUsers, setListUsers] = useState([])

  useEffect(() => {
    setUser(getUserInfo())
  }, [])

  async function getUsers() {
    const data = await axios.get(url);
    const info = data.data;
    setListUsers(info);
}


  useEffect(() => {

    getUsers(); 


  }, [listUsers.length]);  

  async function deleteWatchlistItem(targetId) {
    const deleteWatchlistItem = {
        userId: targetId,
      }
    const url = "http://localhost:8085/deleteUser";

    await axios.delete(url, {
        data: deleteWatchlistItem,
      })

      const newList = listUsers.filter((el) => el.id !== el.id); // This causes a re-render because we change state. Helps cause a re-render.
      setListUsers(newList);  // This causes a re-render because we change state.
      

}

  function usersList() {
    return listUsers.map((userPerson) => {
      return (
        <tr style={{background:"rgb(50,58,69)"}}>
          <td>{userPerson.username}</td>
          <td>{userPerson.email}</td>
          <td>${Number(userPerson.income).toLocaleString()}</td>
          <td>{userPerson.user_id !== 374 ? <Button size="sm" variant="danger" onClick={() => {deleteWatchlistItem(userPerson.user_id)}}>Delete: {userPerson.user_id}</Button>: null}</td>
        </tr>
      );

      
    });
  }


  if(user && user.user_id === 374){
    return (<>
    <h3 style={{textAlign: 'center'}}>{listUsers.length} Users have signed up.</h3>
    <Table bordered hover style={{background: "rgb(50,58,69)",color: "white", textAlign:"center"}} size="sm">
        <thead>
        <tr style={{color: "#14A44D"}}>
          <th>Username</th>
          <th>Email</th>
          <th>Income</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {usersList()}
      </tbody>
    </Table>
    </>)
  
}}





