import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import AboutCard from './AboutCard';


export default function About() {

  return (
    <>
    <Box sx={{backgroundImage: 'linear-gradient(180deg, #CEE5FD, #FFF)',  backgroundSize: '100% 30%', backgroundRepeat: 'no-repeat', width: '100%', pt: { xs: 14},  pb: { xs: 7}, borderBottom: '1px solid', borderColor: 'divider'}}>
    <Container>
        <Typography variant="h2" component="h2" margin={2} align='center' borderBottom='2px solid' borderColor='divider' gutterBottom>About Me</Typography>
            <AboutCard/>
    </Container>
    </Box> 
        </>
  )};
