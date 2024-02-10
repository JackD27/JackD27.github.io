import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import Image from 'react-bootstrap/Image';
import logo from '../../images/JackFacePic.jpg';




export default function AboutCard() {
  return (
    <Card sx={{ margin: 2, border: '2px solid', borderColor: 'rgb(85, 166, 246)', borderRadius: '20px', boxShadow: `0 0 24px 12px ${alpha('#033363', 0.15)}`}}>
      <CardContent align='center'>
      <Image
              alt="Profile Picture"
              src={logo}
              width="250"
              height="250"
              roundedCircle 
            />
        <Typography sx={{ fontSize: 26 }}  align='center'color="text.secondary" gutterBottom>
          Software Developer from Boston, Massachusetts. I can build Full Stack applications, Data Science apps, and Games. I have built many applications with cutting-edge technology that help others on a daily basis.
        </Typography>
        <Typography  variant='h4' align='center'color="text.secondary" gutterBottom>
          Backend
        </Typography>
        <Typography sx={{ fontSize: 22 }}  align='center'color="text.secondary" gutterBottom>
          I've built applications using MongoDB, Express, React, and Node.js - MERN Stack - I've also built applications using Django, Flask, and FastAPI. I've also built applications using Spring and PostgreSQL.
        </Typography>
        <Typography  variant='h4' align='center'color="text.secondary" gutterBottom>
          Frontend
        </Typography>
        <Typography sx={{ fontSize: 22 }}  align='center'color="text.secondary" gutterBottom>
            I build my apps mostly with React. I've also built applications with using plain HTML, CSS, and JavaScript. I've made applications with JavaFX, Electron, and Tkinter.
        </Typography>
        <Typography  variant='h4' align='center'color="text.secondary" gutterBottom>
          Languages
        </Typography>
        <Typography sx={{ fontSize: 22 }}  align='center'color="text.secondary" gutterBottom>
            I love Python and JavaScript. They are my favorite languages. I use C# and Java if I need to. Java was the first and main language I used for a long time. Python and JavaScript just have too many good libraries and frameworks to not use them.
        </Typography>
        
       
      </CardContent>
      
    </Card>
  );
}