// React Bootstrap
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
// Material UI
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

function Navigationbar() {

  // function renderTooltip(props) {

  //   console.log(props.id);

  //   return (
  //     <Tooltip>
  //       Tooltip Test
  //     </Tooltip>
  //   )
  // }

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

              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 250}}
                overlay={<Tooltip id="home-tooltip">Go to homepage</Tooltip>}
                id="home-button"
              >
                <Nav.Link href="#home" >Home</Nav.Link>
              </OverlayTrigger>

              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 250}}
                overlay={<Tooltip id="createaccount-tooltip">Create an account here</Tooltip>}
              >
                <Nav.Link href="#createaccount">Create Account</Nav.Link>
              </OverlayTrigger>

              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 250}}
                overlay={<Tooltip id="deposit-tooltip">Make a deposit to your account</Tooltip>}
              >
                <Nav.Link href="#deposit">Deposit</Nav.Link>
              </OverlayTrigger>

              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 250}}
                overlay={<Tooltip id="withdraw-tooltip">Make a withdrawal from your account</Tooltip>}
              >
                <Nav.Link href="#withdraw">Withdraw</Nav.Link>
              </OverlayTrigger>

              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 250}}
                overlay={<Tooltip id="alldata-tooltip">See all your submission data</Tooltip>}
              >
                <Nav.Link href="#alldata" >All Data</Nav.Link>
              </OverlayTrigger>
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>

    
  );
}

export default Navigationbar;