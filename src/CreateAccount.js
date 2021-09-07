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

function CreateAccount(){

  const context = useContext(UserContext);

  // state of submission data
  const [ formData, updateFormData ] = useState({
    name: '', 
    email: '', 
    password: ''    
  });

  // state of whether user has interacted with field
  const [ touched, updateTouched ] = useState({
    nameTouched: false,
    emailTouched: false,
    passwordTouched: false
  })
  
  // state of if field is valid
  const [ validation, updateValidation ] = useState({ 
    nameInvalid: true, 
    emailInvalid: true, 
    passwordInvalid: true,
    passwordEvents: 0,
    submitDisabled: true
  });

  // state of if error should be shown for field
  const [ errors, updateErrors ] = useState({
    nameError: false,
    emailError: false,
    passwordError: false
  });

  // state of the submit button's name
  const [ nameOfSubmitButton, updateButtonName ] = useState('Create Account');

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
    if(validation.submitDisabled
      && !validation.nameInvalid
      && touched.nameTouched 
      && !validation.emailInvalid
      && touched.emailTouched
      && !validation.passwordInvalid
      && touched.passwordTouched){
        updateValidation({...validation, submitDisabled: false});
      } 
  }, [validation, touched]);

  function handleChange(event) {

    let formDataUpdates = { [event.target.name]: event.target.value };
    let touchedUpdates = { [event.target.name + 'Touched']: true}
    let validationUpdates = { };
    let errorUpdates = { };

    if(event.target.name === 'name' || event.target.name === 'email'){
      errorUpdates[event.target.name + 'Error'] = touched[event.target.name + 'Touched'] && event.target.value.length <= 0;
      validationUpdates[event.target.name + 'Invalid'] = event.target.value.length <= 0;
      if(event.target.value.length <= 0)
        validationUpdates.submitDisabled = true;
    }
    else if(event.target.name === 'password'){
      validationUpdates.passwordEvents = validation.passwordEvents + 1;
      errorUpdates.passwordError = touched.passwordTouched && validation.passwordEvents > 7 && event.target.value.length < 8;
      validationUpdates.passwordInvalid = event.target.value.length < 8;
      if(event.target.value.length < 8)
        validationUpdates.submitDisabled = true;
    }
    
    updateFormData({...formData, ...formDataUpdates});
    updateTouched({...touched, ...touchedUpdates});
    updateValidation({...validation, ...validationUpdates});
    updateErrors({...errors, ...errorUpdates});    
  }

  function handleSubmit(event) {
    event.preventDefault();
    let success = true;

    if(formData.name.length <= 0){
      updateValidation({...validation, nameInvalid: true});
      updateErrors({...errors, nameError: true});
      success = false;
    }
    if(formData.email.length <= 0){
      updateValidation({...validation, emailInvalid: true});
      updateErrors({...errors, emailError: true});
      success = false;
    }
    if(formData.password.length < 8){
      updateValidation({...validation, passwordInvalid: true});
      updateErrors({...errors, passwordError: true});
      success = false
    }

    if(success){
      
      context.submissionCount += 1;
      context.submissions.push({
        submissionID: context.submissionCount,
        type: 'create account',
        data: {...formData}
      });
      console.log(JSON.stringify(context));

      updateSuccessfulSubmit(true);

      updateFormData({
        name: '', 
        email: '', 
        password: ''    
      });

      updateButtonName('Add another account');
    }
  }

  return (
    <div>
      <Container>
        <Row className="justify-content-center mt-5">
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Create Account</Card.Title>
              <Card.Text>
                Please fill out fields
              </Card.Text>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicText">
                  <Form.Label>Name</Form.Label>
                  <Form.Control 
                    type="text"
                    placeholder="Name"
                    required
                    isInvalid={errors.nameError}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Name cannot be blank
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email Address"
                    required
                    isInvalid={errors.emailError}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Email cannot be blank
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    required
                    isInvalid={errors.passwordError}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Password must be at least 8 characters
                  </Form.Control.Feedback>
                </Form.Group>
                {successfulSubmit && <Form.Label className='text-success'>Account successfully created.</Form.Label>}
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

export default CreateAccount;