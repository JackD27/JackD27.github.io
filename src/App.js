import React from "react";
import { Route, Routes, useLocation, BrowserRouter, Switch} from "react-router-dom";

//Private Routes 
import PrivateRoute from "./utilities/PrivateRoute";
import Admin from "./components/misc/adminPage";

// Navbar
import Navbar from "./components/navbar";

//Register Page
import Login from "./components/register/loginPage";
import Register from "./components/register/registerPage";

//Utilities Page
import Settings from "./components/misc/editUserPage";
import ErrorPage from "./components/misc/errorPage";

//Dashboard Page
import AddTransaction from "./components/homepage/addTransactionComp";
import RecurringExpenses from "./components/homepage/recurringExpensesPage";
import Dashboard from "./components/homepage/dashboardPage";

//Stock Page
import InvestingPage from "./components/stockpage/investingPage";
import WatchlistPage from "./components/stockpage/watchListPage"; 
import StockPage from "./components/stockpage/stockPage";
import AddStockItem from "./components/stockpage/addPortfolioComp";
import AddWatchlistItem from "./components/stockpage/addWatchlistComp";

// User Info
import getUserInfo from "./utilities/decodeJwt";

document.body.style = 'background: rgb(234,237,242)';


const App = () => {


  // function locationPlace(){
  //   if(location.pathname === '/' || location.pathname === '/register')
  //   {
  //     return false
  //   }
  //   else{
  //     return true
  //   }

  // }
  
  // if(!user && locationPlace()){
  //    return(<ErrorPage></ErrorPage>) 
  // }
  
 

  return (
    <>
        {getUserInfo() ? <Navbar /> : null}
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
            <Route exact path="*" element={<ErrorPage />} />
        </Routes>
        </>
  );
};



export default App
