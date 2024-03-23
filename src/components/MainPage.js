import Posts from './Posts/Posts.js';
import CSSBaseline from '@mui/material/CssBaseline';
import About from './AboutMe/About.js';


function MainPage() {

  return (
    <>
    <CSSBaseline/>
    <About/>
    <Posts/>
    </>
  );
}

export default MainPage;