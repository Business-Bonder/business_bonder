import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import Form from 'react-bootstrap/Form';

const SignUp = ({ location }) => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);
  const [isCompany, setIsCompany] = useState(false); // Track the switch state
  const schema = new SimpleSchema({
    email: String,
    password: String,
  });

  const bridge = new SimpleSchema2Bridge(schema);
  const handleSwitchChange = (event) => {
    setIsCompany(event.target.checked);
  };

  const submit = (doc) => {
    const { email, password, role = 'student' } = doc;
    Accounts.createUser({ email, username: email, password, role }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        setRedirectToRef(true);
      }
    });
  };

  const { from } = location?.state || { from: { pathname: '/add' } };

  if (redirectToReferer) {
    return <Navigate to={from} />;
  }

  return (
    <Container id="signup-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Register your account</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={submit}>
            <Card>
              <Card.Body>
                <TextField name="email" placeholder="E-mail address" />
                <TextField name="password" placeholder="Password" type="password" />
                <Form>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Create Company Account"
                    checked={isCompany} // Bind to state
                    onChange={handleSwitchChange} // Update state on change
                  />
                </Form>
                <ErrorsField />
                <SubmitField />
              </Card.Body>
            </Card>
          </AutoForm>
          <Alert variant="light">
            Already have an account? Login <Link to="/signin">here</Link>
          </Alert>
          {error === '' ? '' : (
            <Alert variant="danger">
              <Alert.Heading>Registration was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

SignUp.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
};

SignUp.defaultProps = {
  location: { state: { pathname: '/add' } },
};

export default SignUp;
