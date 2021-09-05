// React Bootstrap
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
// Material UI
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';


function Navigationbar() {
  return (

    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#">
            <AccountBalanceIcon color='primary' />
            Bad Bank
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#createaccount">Create Account</Nav.Link>
              <Nav.Link href="#deposit">Deposit</Nav.Link>
              <Nav.Link href="#withdraw">Withdraw</Nav.Link>
              <Nav.Link href="#alldata">All Data</Nav.Link>              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>

    
  );
}

export default Navigationbar;
