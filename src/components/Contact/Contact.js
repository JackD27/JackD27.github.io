import Container from '@mui/material/Container';
import { Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useStyles from './styles.js';
import { useState } from 'react';


export default function Contact() {

  const [postData, setPostData] = useState({ name: '', email: '', message: '' })
  const [message, setMessage] = useState({ message: '', color: 'black' })


  function clear() {s
    setPostData({ name: '', email: '', message: '' });
  }

  function handleSubmit (e) {
    e.preventDefault()
    if (postData.name === '' || postData.email === '' || postData.message === '') {
      setMessage({ message: 'Please fill out all fields.', color: 'red' })
      return
    }else {
      setMessage({ message: 'Thank you for reaching out! I will get back to you as soon as possible.', color: 'green' })
    }
    clear()
  }

  const classes = useStyles();
  return (
    <>
    <Box component='form' sx={{bgcolor: '#090E10', color: 'white', width: '100%', borderBottom: '1px solid', pt: { xs: 7}, pb: { xs: 10}, borderColor: 'divider'}}>
    <Container >
        <Typography variant="h2" component="h2"  align='center' gutterBottom>Contact</Typography>
        <Stack spacing={3} direction={'row'}>
          <TextField className={classes.textField} value={postData.name} onChange={(e) => setPostData({ ...postData, name: e.target.value })} id="outlined-basic" label="Name"  sx={{ input: { border: '2px solid', borderColor: 'divider', borderRadius: '12px'}}} variant="outlined" />
          <TextField className={classes.textField} value={postData.email} onChange={(e) => setPostData({ ...postData, email: e.target.value })} type='email' id="outlined-basic" label="Email" sx={{ input: { border: '2px solid', borderColor: 'divider', borderRadius: '12px' } }} variant="outlined" />
        </Stack>
        <Stack spacing={1} mt={3}>
          <TextField className={classes.textField} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} id="outlined-basic" label="Message" multiline maxRows={8} sx={{ input: { border: '2px solid', maxHeight: '100%', borderColor: 'divider', borderRadius: '12px' } }} variant="outlined" />
          <Button variant="contained" onClick={handleSubmit} size='large' type='submit' sx={{ maxWidth: 1/4}}>Submit</Button>
          <Typography variant="h6" component="h6" align='center' color={message.color} gutterBottom>{message.message}</Typography>
        </Stack>
    </Container>
    </Box> 
        </>
  )};
