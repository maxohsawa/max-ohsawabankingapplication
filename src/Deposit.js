// React
import {useState} from 'react';
import {useEffect} from 'react';
import {useContext} from 'react';
// React Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// Application
import { UserContext } from './App';

function Deposit(){

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
    amountError: false,
    nanError: false,
    errorsExist: false
  });

  function checkErrors() {
    console.log(errors.amountError || errors.nanError);
    return false;
  }

  // state of the submit button's name
  const [ nameOfSubmitButton, updateButtonName ] = useState('Deposit');

  // state of successful submission
  const [ successfulSubmit, updateSuccessfulSubmit ] = useState(false);

  // output all state for debugging
  // useEffect( () => {
  //   console.log('formData: ', formData);
  //   console.log('touched: ', touched);
  //   console.log('validation: ', validation);
  //   console.log('errors: ', errors);
  // }, [formData, touched, validation, errors]);

  useEffect( () => {
    if(touched.amountTouched){
      let errorUpdates = {};
      if(isNaN(formData.amount)){
        errorUpdates.nanError = true;
        errorUpdates.amountError = false;
      }      
      else if(formData.amount <= 0) {
        errorUpdates.nanError = false;
        errorUpdates.amountError = true;
      }

      if(errorUpdates.nanError || errorUpdates.amountError)
        errorUpdates.errorsExist = true;
      else {
        errorUpdates.errorsExist = false;
        updateValidation({...validation, submitDisabled: false});
      }
      
      updateErrors({...errors, ...errorUpdates});
    }

  }, [formData, touched]);

  useEffect( () => {
    if(validation.submitDisabled
      && !validation.amountInvalid
      && touched.amountTouched){
        updateValidation({...validation, submitDisabled: false});
      } 
  }, [validation, touched]);

  // useEffect( () => {
  //   if(errors.nanError || errors.amountError)
  //     updateErrors({...errors, errorsExist: true});
  // }, [errors]);

  function handleChange(event) {

    updateFormData({...formData, amount: event.target.value});
    if(event.target.value.length > 0)
      updateTouched({amountTouched: true});
    // let formDataUpdates = { [event.target.name]: event.target.value };
    // let touchedUpdates = { [event.target.name + 'Touched']: true}
    // let validationUpdates = { };
    // let errorUpdates = { };

    // let isNotANumber = isNaN(event.target.value);
    // console.log('isNaN: ', isNotANumber);

    // if(event.target.name === 'amount'){

    //   if(isNotANumber){
    //     validationUpdates.amountInvalid = true;
    //   }
    //   else if(event.target.value <= 0){
    //     validationUpdates.amountInvalid = true;
    //   }
    //   else {
    //     validationUpdates.amountInvalid = false;
    //   }

    //   if(touched.amountTouched && isNotANumber){
    //     errorUpdates.nanError = true;
    //   }
    //   else if(touched.amountTouched && event.target.value <= 0){
    //     errorUpdates.nanError = false;
    //     errorUpdates.amountError =  true;
    //   }
    //   else {
    //     errorUpdates.nanError = false;
    //     errorUpdates.amountError = false;
    //   }
      
    //   if(event.target.value <= 0 || isNotANumber)
    //     validationUpdates.submitDisabled = true;
    // }

    // updateFormData({...formData, ...formDataUpdates});
    // updateTouched({...touched, ...touchedUpdates});
    // updateValidation({...validation, ...validationUpdates});
    // updateErrors({...errors, ...errorUpdates});    
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
        type: 'deposit',
        data: {...formData}
      });
      console.log(JSON.stringify(context));

      updateSuccessfulSubmit(true);

      updateFormData({
        amount: ''
      });

      updateValidation({...validation, submitDisabled: true});

      updateTouched({ amountTouched: false});

      updateButtonName('Make another deposit');
    }
  }

  return (
    <div>
      <Container>
        <Row className="justify-content-center mt-5">
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Deposit</Card.Title>
              <Card.Text>
                Please fill out deposit amount
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
                    {console.log(errors)}
                    {errors.amountError && <div>Amount must be greater than zero</div>}
                    {errors.nanError && <div>Input must be a number</div>}
                  </Form.Control.Feedback>
                </Form.Group>

                {successfulSubmit && <Form.Label className='text-success'>Amount successfully deposited</Form.Label>}
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
      </Container>
    </div>
  )
}

export default Deposit;