import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Col, Container, Row, Nav } from 'react-bootstrap';
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
          </Col>
        </Row>
      </Container>
    ) : <LoadingSpinner />
  );
};

export default AdminPage;
