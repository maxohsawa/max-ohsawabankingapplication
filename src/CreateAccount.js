// React Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// React
import {useState} from 'react';
import {useEffect} from 'react';

function CreateAccount(){

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
  }, [validation]);

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

    if(success)
      alert(JSON.stringify(formData));
  }

  return (
    <div>
      <Container>
        <Row className="justify-content-center mt-5">
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Create Account</Card.Title>
              <Card.Text>
                Please fill out the fields
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
                    value={formData.nameField}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Name cannot be blank.
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
                    value={formData.emailField}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Email cannot be blank.
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
                    value={formData.passwordField}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Password must be at least 8 characters.
                  </Form.Control.Feedback>
                </Form.Group>
                <Button 
                  variant="primary"
                  type="submit"
                  disabled={validation.submitDisabled}
                  onClick={handleSubmit}
                >
                  Create Account
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