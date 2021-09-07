// React
import {useState} from 'react';
import {useEffect} from 'react';
import {useContext} from 'react';
// React Bootstrap
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// Application
import { UserContext } from './App';

function Withdraw(){

  const context = useContext(UserContext);

  // state of submission data
  const [ formData, updateFormData ] = useState({
    amount: '' 
  });

  // state of whether user has interacted with field
  const [ touched, updateTouched ] = useState({
    amountTouched: false
  })
  
  // state of if field is valid
  const [ validation, updateValidation ] = useState({ 
    amountInvalid: true,
    submitDisabled: true
  });

  // state of if error should be shown for field
  const [ errors, updateErrors ] = useState({
    nanError: false,
    negativeError: false,
    amountError: false,
    errorsExist: false
  });

  // state of the submit button's name
  const [ nameOfSubmitButton, updateButtonName ] = useState('Withdraw');

  // state of successful submission
  const [ successfulSubmit, updateSuccessfulSubmit ] = useState(false);

  // controls which error states are toggled
  useEffect( () => {
    if(touched.amountTouched){

      let validationUpdates = {};
      let errorUpdates = {};

      if(isNaN(formData.amount)){
        errorUpdates.nanError = true;
        errorUpdates.negativeError = false;
        errorUpdates.amountError = false;
      }      
      else if(formData.amount <= 0) {
        errorUpdates.nanError = false;
        errorUpdates.negativeError = true;
        errorUpdates.amountError = false;
      }
      else if(formData.amount > context.balance){
        errorUpdates.nanError = false;
        errorUpdates.negativeError = false;
        errorUpdates.amountError = true;
      }

      if(errorUpdates.nanError || errorUpdates.negativeError){
        errorUpdates.errorsExist = true;
        validationUpdates.submitDisabled = true;
      }
      else if(!errorUpdates.nanError && !errorUpdates.negativeError && errorUpdates.amountError){
        errorUpdates.errorsExist = true;
        validationUpdates.submitDisabled = false;
      }
      else {
        errorUpdates.errorsExist = false;
        validationUpdates.submitDisabled = false;
      }

      if(errorUpdates.amountError)
        updateButtonName('OVERDRAFT');
      else
        updateButtonName('Withdraw');

      updateValidation({...validation, ...validationUpdates});
      updateErrors({...errors, ...errorUpdates});
    }

  }, [formData, touched]);

  function handleChange(event) {

    updateFormData({...formData, amount: event.target.value});
    if(event.target.value.length > 0)
      updateTouched({amountTouched: true});
   
  }

  function handleSubmit(event) {
    event.preventDefault();
    let success = true;

    if(isNaN(formData.amount)){
      updateValidation({...validation, amountInvalid: true});
      updateErrors({...errors, nanError: true});
    }
    else if(Number(formData.amount) <= 0){
      updateValidation({...validation, amountInvalid: true});
      updateErrors({...errors, nanError: false, amountError: true});
      success = false;
    }

    if(success){
      
      context.submissionCount += 1;
      context.submissions.push({
        submissionID: context.submissionCount,
        type: 'withdraw',
        data: {
          amount: Number(formData.amount)
        }
      });

      context.balance -= Number(formData.amount);
      updateSuccessfulSubmit(true);

      updateFormData({
        amount: ''
      });

      updateErrors({...errors, errorsExist: false});
      updateValidation({...validation, submitDisabled: true});
      updateTouched({ amountTouched: false});
      updateButtonName('Make another withdrawal');
    }
  }

  return (
    <div>
      <Container>
        <Col>
          <Row className="justify-content-center mt-5 h1">
            {`Balance: $${context.balance}`}
          </Row>

          <Row className="justify-content-center mt-5">
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Withdraw</Card.Title>
                <Card.Text>
                  Please fill out withdraw amount
                </Card.Text>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control 
                      type="text"
                      placeholder="0"
                      required
                      isInvalid={errors.errorsExist}
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.amountError && <div>Amount is more than balance</div>}
                      {errors.amountError && <div>Withdrawal of this amount will incur overdraft</div>}
                      {errors.negativeError && <div>Amount cannot be less than zero</div>}
                      {errors.nanError && <div>Input must be a number</div>}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {successfulSubmit && !touched.amountTouched && <Form.Label className='text-success'>Amount successfully withdrawn</Form.Label>}
                  <Button 
                    variant="primary"
                    type="submit"
                    disabled={validation.submitDisabled}
                    onClick={handleSubmit}
                  >
                    {nameOfSubmitButton}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Row>
        </Col>

      </Container>
    </div>
  )
}

export default Withdraw;