import React, { useEffect, useState } from "react";
import getUserInfo from '../../utilities/decodeJwt';
import { Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

// Here, we display our Navbar
export default function NavbarFunction() {
  const navigate = useNavigate()
  const [user, setUser] = useState({})

  useEffect(() => {
    setUser(getUserInfo())
  }, [])

  if(user && user.user_id === 374){
    return (<div style={{textAlign: "center", position:"flex", marginTop:"300px", fontSize: "60px"}}>
    <h3>Secret WIP.</h3>
    
    </div>
  );
  
}}