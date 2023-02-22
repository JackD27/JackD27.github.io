import {Button, Card} from 'react-bootstrap';
import picture from '../../images/pieGraph.jpg';

function PieGraphCard() {
  return (
    <Card className="text-center"style={{ background: "rgb(50,58,69)", width: "18rem"}}>
      <Card.Img variant="top" src={picture} />
      <Card.Body style={{color: "white"}}>
        <Card.Title>Pie Graph</Card.Title>
        <Card.Text>Quick Example for the Pie Graph</Card.Text>
        <Button variant="primary">Work in Progress</Button>
      </Card.Body>
    </Card>
  );
}

export default PieGraphCard;