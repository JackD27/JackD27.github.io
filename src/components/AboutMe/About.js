import * as React from 'react';
import Container from '@mui/material/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import AboutCard from './AboutCard';


export default function About() {

  return (
    <>
    <Box sx={{backgroundImage: 'linear-gradient(180deg, #CEE5FD, #FFF)',  backgroundSize: '100% 30%', backgroundRepeat: 'no-repeat', width: '100%', pt: { xs: 14},  pb: { xs: 7}, borderBottom: '1px solid', borderColor: 'divider'}}>
    <Container>
        <Typography variant="h2" component="h2" margin={2} align='center' borderBottom='2px solid' borderColor='divider' gutterBottom>About Me</Typography>
        <Row>
          <Col>
            <AboutCard/>
          </Col>
          
        </Row>
    </Container>
    </Box> 
        </>
  )};
