import Posts from './Posts/Posts.js';
import CSSBaseline from '@mui/material/CssBaseline';
import About from './AboutMe/About.js';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';



function MainPage() {

  useEffect(() => {
    ReactGA.send("pageview");
  }, []);

  return (
    <>
    <CSSBaseline/>
    <About/>
    <Posts/>
    </>
  );
}

export default MainPage;