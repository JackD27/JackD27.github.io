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
            I build my apps mostly with React. I've made applications with JavaFX, Electron, and Tkinter. I'm very familiar with Material-UI, Bootstrap, HTML and CSS.
        </Typography>
        <Typography  variant='h4' align='center'color="text.secondary" gutterBottom>
          Languages
        </Typography>
        <Typography sx={{ fontSize: 22 }}  align='center'color="text.secondary" gutterBottom>
            I like Python and JavaScript. They are my most used languages. I use C# and Java depending on the project. I have used a lot of SQL and NoSQL databases on some of my projects.
        </Typography>
      </CardContent>
    </Card>
  );
}