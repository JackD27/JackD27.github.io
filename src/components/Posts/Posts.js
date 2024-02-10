import * as React from 'react';
import Post from './Post/Post';
import Container from '@mui/material/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { projects }from '../../constants';


function Posts() {

  return (
    <>
     <Box sx={{backgroundColor: '#fafafa', width: '100%', pt: { xs: 7}, pb: { xs: 7}, borderBottom: '1px solid', borderColor: 'divider'}}>
      <Container>
        <Typography variant="h2" borderBottom='2px solid' borderColor='rgb(85, 166, 246)' component="h2" margin={2} align='center' gutterBottom>Projects</Typography>
        
        <Row className='justify-content-md-center'>
          {projects.map((value, i) => (
            <Col lg={6} md={6} sm={12} key={i}>
              <Post hi={4} 
              title={value.title} 
              url={value.url} 
              headline={value.headline} 
              websiteLink={value.link} 
              frontPic={value.frontPic} 
              />
            </Col>
           
          ))}
          </Row>
    </Container>
    </Box>
    </>
      
      
  );
}

export default Posts;