import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Col, Container, Row, Nav, Form, FormControl } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Contacts } from '../../api/contact/Contacts';
import LoadingSpinner from '../components/LoadingSpinner';

const AdminPage = () => {
  const { ready } = useTracker(() => {
    const subscription = Meteor.subscribe(Contacts.adminPublicationName);
    return {
      ready: subscription.ready(),
    };
  }, []);

  return (
    ready ? (
      <Container className="py-3 d-flex align-items-center justify-content-center">
        <Row>
          <Col className="text-center">
            <h2 className="fw-bold mb-4">Admin: Info</h2>
            <div className="mb-4">
              <Button variant="success" className="m-1">
                <Nav.Link as={NavLink} to="/user">Users</Nav.Link>
              </Button>
              <Button variant="success" className="m-1">
                <Nav.Link as={NavLink} to="/company">Company</Nav.Link>
              </Button>
            </div>
            <Form className="d-flex align-items-center justify-content-center">
              <FormControl
                type="search"
                placeholder="Search"
                className="mr-2"
                aria-label="Search"
              />
              <Button variant="success">Search</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    ) : <LoadingSpinner />
  );
};

export default AdminPage;
