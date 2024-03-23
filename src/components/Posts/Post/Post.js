import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions, Modal, Box, Stack, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LanguageIcon from '@mui/icons-material/Language';
import ReactGA from 'react-ga4';
import { useState} from 'react';


export default function Post(props) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 400,
    minWidth: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  function handleClick(link) {
    ReactGA.event({
      category: 'User',
      action: 'Clicked Button',
      label: link.toString()
    })
    window.location.href = link
    console.log('clicked');
  }
  

  return (
    <>
    <Card sx={{border: '1px solid', position:'relative', borderRadius: '10px', borderColor: 'divider'}}>
      
        {props.frontPic ? <CardMedia
          component="img"
          height='inherit'
          zIndex={1}
          src={props.frontPic}
          alt='No Image Found'
        /> : null}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.headline}
          </Typography>
        </CardContent>
      
      <CardActions>
        <Stack direction="row" spacing={2}>
        <Button onClick={handleOpen} size="small" color="primary">
          Read More
        </Button>
          {props.websiteLink ? <IconButton size='small' onClick={() => handleClick(props.websiteLink)}><LanguageIcon/></IconButton> : null}
          {props.gameLink ? <IconButton size='small' onClick={() => handleClick(props.gameLink)}><SportsEsportsIcon/></IconButton> : null}
          <IconButton size='small' onClick={() => handleClick(props.githubUrl)}><GitHubIcon/></IconButton>
        </Stack>
      </CardActions>
    </Card>
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {props.title}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        WIP, I just wanted to get this website up. I will update these.
      </Typography>
    </Box>
  </Modal>
  </>
  );
}