import Header from './components/Header';
import * as React from 'react';
import Footer from './components/Footer';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import ReactGA from 'react-ga4';
import { Route, Routes } from "react-router-dom";
import MainPage from './components/MainPage';

const trackingId = "G-FDMQ8XNGRM";

ReactGA.initialize(trackingId);

function App() {

   return (
    <>
    <Header />
    <Routes>
      <Route exact path="/" element={<MainPage />} />
    </Routes>
    <Footer />
      </>

  );
}

export default App;
