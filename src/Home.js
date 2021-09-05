// React Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// Image Assets
import bankimage from './bank.png';

function Home() {
  return (
    <div>
      <Container>
        <Row className="justify-content-center mt-5">
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={bankimage} />
            
            <Card.Body>
              <Card.Title>Bad Bank</Card.Title>
              <Card.Text>
                Welcome to the worst bank.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
