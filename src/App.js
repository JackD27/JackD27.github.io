import Header from './components/Header';
import * as React from 'react';
import Footer from './components/Footer';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Routes } from "react-router-dom";
import MainPage from './components/MainPage';

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
