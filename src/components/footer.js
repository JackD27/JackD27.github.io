import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import {iconArray }from '../constants';
import ReactGA from 'react-ga4';

const trackingId = "G-FDMQ8XNGRM";
ReactGA.initialize(trackingId);

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'© '}{new Date().getFullYear()}{'  '}
        Jackson Davis
    </Typography>
  );
}

function handleClick(link, name) {
  ReactGA.event({
    category: 'User',
    action: 'Clicked Button in Footer',
    label: name.toString()
  })

  window.location.href = link
}


function Footer() {

  return (
    <Box component="footer" sx={{backgroundImage: 'linear-gradient(180deg, #FFF, #CEE5FD)', bgcolor:'background.paper', backgroundSize: '100% -10%', backgroundRepeat: 'no-repeat', width: '100%', py: 6, borderBottom: '1px solid', borderColor: 'divider'}}>
      <Container maxWidth="lg" align='center' >
      {iconArray.map((text, index) => (
          <IconButton key={index} onClick={() => handleClick(text.link, text.name)}>{text.icon}</IconButton>
        ))}

      <Copyright />
      </Container>
    </Box>
  );
}

export default Footer;