import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import InstagramIcon from '@mui/icons-material/Instagram';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import FinancePic from './images/SignInPageFinance.png';
import JackFinancePic from './images/PersonalFinanceAppPic.png';
import FroggerPic from './images/Frogger.png';
import NewPiCar from './images/NewPiCar.png';
import PetAppPic from './images/PetApp.png';
import StatsPic from './images/Stats.png';


export const projects = [
    { title: 'My Personal Finance App', githubUrl: 'https://github.com/JackD27/COTreport', frontPic: JackFinancePic, headline: 'An app that fetches the COT report data from the CFTC website and saves it to a file. The user can also calculate pips from trading and use a financial compound calculator.', websiteLink: 'https://jackfinanceapp.netlify.app/'},
    { title: 'Pet App', githubUrl: 'https://github.com/JackD27/PetApp', frontPic: PetAppPic, headline: 'An example of a functional web app for a Pet Services Company.', websiteLink: 'https://petappjack.netlify.app/'},
    { title: 'Capstone Finance App (Moneypad)', githubUrl: 'https://github.com/JackD27/CapstoneProject', frontPic: FinancePic, headline: 'This was my College Capstone Project. A finance web app that allows users to track their spending and set budgets. User is able to have a stock portfolio to track their favorite stocks and owned stocks.' },
    { title: 'Daily Fantasy Sports(DFS) Web App', githubUrl: 'https://github.com/JackD27/StatGrabber', frontPic: StatsPic, headline: 'A program that fetches stats from different sports websites including DraftKings, UnderDogFantasy, PrizePicks and ESPN and saves them to a file. There is now a newer version on the web.', websiteLink: 'https://jacksdfsapp.netlify.app/'},
    { title: 'Frogger', githubUrl: 'https://github.com/JackD27/Frogger', frontPic: FroggerPic, headline: 'I remade Frogger in Java for one of my first programming classes.', gameLink: 'https://www.greenfoot.org/scenarios/26946?fbclid=IwAR1rAzvqtRhdC1yfmF_G9GeENLfhNurmru3BkwhQlmVcuzwzn1Tb5rGosvw'},
    { title: 'Self-Driving Raspberry Pi Car', githubUrl: 'https://github.com/JackD27/PiCar-stopping-at-Stop-Signs', frontPic: NewPiCar, headline: 'A self-driving car that uses a Raspberry Pi and a camera to detect stop signs and is able stop at them, then continue to drive.'},
    { title: 'Social Media App', githubUrl: 'https://github.com/brockenbrough/social', headline: 'A social media app that allows users to post, comment, and like a post. Users can also follow other users and see their posts on their feed. I worked in the following/follow team with another student.' },
  ];

  export const iconArray = [
    {name: 'Download Resume', icon: <InboxIcon/>, link: 'https://drive.google.com/file/d/1eNy63LetZ5GrMbfv9H8sLvWuFZ8G9RgU/view?usp=sharing'}, 
    {name: 'Send Email', icon: <MailIcon/>, link: 'mailto:jdaviskid27@yahoo.com'},
    {name: 'Github', icon: <GitHubIcon/>, link: 'https://github.com/JackD27'},
    {name: 'LinkedIn', icon: <LinkedInIcon />, link: 'https://www.linkedin.com/in/jackd27/'},
    {name: 'Instagram', icon: <InstagramIcon />, link: 'https://www.instagram.com/jackson.davis27/'},
    {name: 'Itch.io', icon: <SportsEsportsIcon />, link: 'https://jackd27.itch.io/'}
  ]

