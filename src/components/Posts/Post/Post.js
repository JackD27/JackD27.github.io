import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions, Modal, Box, Stack, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { useState} from 'react';
import { Link } from 'react-router-dom';


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
  

  return (
    <>
    <Card sx={{margin: props.hi, border: '1px solid', borderRadius: '10px', borderColor: 'divider'}}>
      
        {props.frontPic ? <CardMedia
          component="img"
          height={300}
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
          <IconButton size='small' component={Link} to={props.url}><GitHubIcon/></IconButton>
          {props.websiteLink ? <IconButton size='small' component={Link} to={props.websiteLink}><SportsEsportsIcon/></IconButton> : null}
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