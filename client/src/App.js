import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import { createContext, useState, useEffect } from "react";

import Navbar from "./components/navbar";
import Home from "./components/homepage/HomePage";
import Login from "./components/register/loginPage";
import Register from "./components/register/registerPage";
import getUserInfo from "./utilities/decodeJwt";


export const UserContext = createContext();

const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  return (
    <>
      <Navbar/>
      <UserContext.Provider value={user}>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
};



export default App
