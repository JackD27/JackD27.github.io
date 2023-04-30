import { GoMarkGithub } from "react-icons/go";
import { GrLinkedin } from "react-icons/gr";
import { BsTrello } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {

  return (
    <div style={{ marginTop: "1.5rem", marginBottom:'1.5rem', bottom: 0 }}>
      <footer style={{ textAlign: "center" }}>
      <Link to={`https://www.linkedin.com/in/jackson-davis-3696a9258/`} style={{ textDecoration: 'none', color: 'black'}}><GrLinkedin size={32} color="#0077B5"/> LinkedIn</Link>
      <Link to={`https://github.com/JackD27`} style={{ textDecoration: 'none', color: 'black', marginLeft: '2rem'}}><GoMarkGithub size={32} color="#333"/> Github</Link>
      <Link to={`https://trello.com/b/cE22K4xL/jacksons-capstone-project`} style={{ textDecoration: 'none', color: 'black', marginLeft: '2rem'}}><BsTrello size={32} color="#0079BF"/> Trello</Link>
      </footer>
    </div>
  );
};

export default Footer;
