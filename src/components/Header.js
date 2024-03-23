import Container from '@mui/material/Container';
import '../styles.css';
import { AppBar, Box, IconButton, Toolbar, Typography} from '@mui/material';
import {useState} from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { iconArray }from '../constants';
import ReactGA from 'react-ga4';

// import Image from 'react-bootstrap/Image';
// import logo from '../images/JackFacePic.jpg';

const trackingId = "G-FDMQ8XNGRM";
ReactGA.initialize(trackingId);



function Header() {


  const [right, setRight] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setRight( open );
  };

  
  function handleClick(link, name) {
    ReactGA.event({
      category: 'User',
      action: 'Clicked Button in Header',
      label: name.toString()
    })

    
    window.location.href = link
  }
  

  const list = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      
      <ListItem>
      <ListItemText primary='Socials and Links' />
      </ListItem>
      <Divider />
      <List>
        {iconArray.map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => handleClick(text.link, text.name)}>
              <ListItemIcon>
                {text.icon}
              </ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
    <Box>
    <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container>
         <Toolbar
            variant="regular"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
            
            }}
          >
        {/* <Image
              alt=""
              src={logo}
              width="40"
              height="40"
              roundedCircle 
            /> */}
          <Typography variant="h6" component="div" sx={{marginLeft: 2, flexGrow: 1, color: "text.primary"}}>
            Jackson Davis
          </Typography>
          
          <IconButton
            size="large"
            edge="start"
            
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor='right'
            open={right}
            onClose={toggleDrawer(false)}
          >
            {list(right)}
          </Drawer>
          
        </Toolbar>
        </Container>
      </AppBar>
    </Box>
      </>
  );
}

export default Header;