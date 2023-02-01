import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import { createContext, useState, useEffect } from "react";

import Navbar from "./components/navbar";
import Home from "./components/homepage/HomePage";
import LandingPage from "./components/users/Landingpage";
import Login from "./components/users/Login";
import Signup from "./components/register/Register";
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
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/home" element={<Home />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
};



export default App
