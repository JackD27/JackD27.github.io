import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import InstagramIcon from '@mui/icons-material/Instagram';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import FinancePic from './images/SignInPageFinance.png';
import FroggerPic from './images/Frogger.png';
import PiCar from './images/PiCar.png';
import StatsPic from './images/Stats.png';


export const projects = [
    { title: 'Finance App', url: 'https://github.com/JackD27/CapstoneProject', frontPic: FinancePic, headline: 'A finance web app that allows users to track their spending and set budgets. User is able to have a stock portfolio to track their favorite stocks and owned stocks.' },
    { title: 'DFS Stat Fetcher', url: 'https://github.com/JackD27/StatGrabber', frontPic: StatsPic, headline: 'A program that fetches stats from different sports websites including DraftKings, UnderDogFantasy, PrizePicks and ESPN and saves them to a file.'},
    { title: 'Frogger', url: 'https://github.com/JackD27/Frogger', frontPic: FroggerPic, headline: 'I remade Frogger in Java for one of my first programming classes.', link: 'https://www.greenfoot.org/scenarios/26946?fbclid=IwAR1rAzvqtRhdC1yfmF_G9GeENLfhNurmru3BkwhQlmVcuzwzn1Tb5rGosvw'},
    { title: 'Self-Driving Raspberry Pi Car', url: 'https://github.com/JackD27/PiCar-stopping-at-Stop-Signs', frontPic: PiCar, headline: 'A self-driving car that uses a Raspberry Pi and a camera to detect stop signs and is able stop at them, then continue to drive.'},
    { title: 'Social Media App', url: 'https://github.com/brockenbrough/social', headline: 'A social media app that allows users to post, comment, and like a post. Users can also follow other users and see their posts on their feed. I worked in the following/follow team with another student.' },
    { title: 'COT Report Data', url: 'https://github.com/JackD27/COTreport', headline: 'An app that fetches the COT report data from the CFTC website and saves it to a file. The user can also calculate pips from trading and use a financial compound calculator.' },
  ];

  export const iconArray = [
    {name: 'Download Resume', icon: <InboxIcon/>, link: 'https://drive.google.com/file/d/10l43Y_uKe69DwWrnQHpUMGMXBZOtZX0G/view?usp=sharing'}, 
    {name: 'Send Email', icon: <MailIcon/>, link: 'mailto:jdaviskid27@yahoo.com'},
    {name: 'Github', icon: <GitHubIcon/>, link: 'https://github.com/JackD27'},
    {name: 'LinkedIn', icon: <LinkedInIcon />, link: 'https://www.linkedin.com/in/jackd27/'},
    {name: 'Instagram', icon: <InstagramIcon />, link: 'https://www.instagram.com/jackson.davis27/'},
    {name: 'Itch.io', icon: <SportsEsportsIcon />, link: 'https://jackd27.itch.io/'}
  ]

