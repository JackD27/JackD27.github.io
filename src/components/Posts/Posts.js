import Post from './Post/Post';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { projects }from '../../constants';


function Posts() {

  return (
    <>
     <Box sx={{backgroundColor: '#fafafa', width: '100%', pt: { xs: 7}, pb: { xs: 7}, borderBottom: '1px solid', borderColor: 'divider'}}>
      <Container>
        <Typography variant="h2" borderBottom='2px solid' borderColor='rgb(85, 166, 246)' component="h2" margin={2} align='center' gutterBottom>Projects</Typography>
        <Grid container spacing={6}>
          {projects.map((value, i) => (
            <Grid item md={6} xs={12} key={i} >
              <Post hi={4} 
              title={value.title} 
              githubUrl={value.githubUrl} 
              headline={value.headline} 
              gameLink={value.gameLink} 
              frontPic={value.frontPic} 
              websiteLink={value.websiteLink}
              />
            </Grid>
           
          ))}
      </Grid>
      </Container>
    </Box>
    </>
      
      
  );
}

export default Posts;