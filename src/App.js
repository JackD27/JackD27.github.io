import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes, useLocation} from "react-router-dom";
import { createContext, useState, useEffect } from "react";

import PrivateRoute from "./utilities/PrivateRoute";


import Navbar from "./components/navbar";


import Login from "./components/register/loginPage";
import Register from "./components/register/registerPage";
import Settings from "./components/misc/editUserPage";
import Admin from "./components/misc/adminPage";
import AddTransaction from "./components/homepage/addTransactionComp";
import AddStockItem from "./components/stockpage/addPortfolioComp";
import AddWatchlistItem from "./components/stockpage/addWatchlistComp";
import RecurringExpenses from "./components/homepage/recurringExpensesPage";
import Dashboard from "./components/homepage/dashboardPage";
import InvestingPage from "./components/stockpage/investingPage";
import WatchlistPage from "./components/stockpage/watchListPage"; 
import StockPage from "./components/stockpage/stockPage";

import getUserInfo from "./utilities/decodeJwt";

export const UserContext = createContext();

document.body.style = 'background: rgb(234,237,242)';


const App = () => {

  

  const [user, setUser] = useState();

  const location = useLocation()

  useEffect(() => {
    setUser(getUserInfo());

  }, []);

  function locationPlace(){
    if(location.pathname === '/' || location.pathname === '/register')
    {
      return false
    }
    else{
      return true
    }

  }
  

  // if(!user && locationPlace()){
  //    return(<ErrorPage></ErrorPage>) 
  // }

  return (
    <>
      <Navbar/>
      <UserContext.Provider value={user}>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/admin" element={<PrivateRoute><Admin/></PrivateRoute>} />
          <Route exact path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
          <Route exact path="/addTransaction" element={<PrivateRoute><AddTransaction /></PrivateRoute>} />
          <Route exact path="/addStock" element={<PrivateRoute><AddStockItem /></PrivateRoute>} />
          <Route exact path="/addWatchlist" element={<PrivateRoute><AddWatchlistItem /></PrivateRoute>} />
          <Route exact path="/stocks" element={<PrivateRoute><InvestingPage /></PrivateRoute>} />
          <Route exact path="/allStocks" element={<PrivateRoute><StockPage /></PrivateRoute>} />
          <Route exact path="/allWatchlist" element={<PrivateRoute><WatchlistPage /></PrivateRoute>} />
          <Route exact path="/transactions" element={<PrivateRoute><RecurringExpenses /></PrivateRoute>} />
          <Route exact path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
        </Routes>
      </UserContext.Provider>
    </>
  );
};



export default App
