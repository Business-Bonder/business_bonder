import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Calendar2CheckFill, FileEarmarkTextFill, PeopleFill } from 'react-bootstrap-icons';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" className="py-3">
    <Row className="align-middle text-center">
      <Col xs={4}>
        <PeopleFill size={100} />
        <h1>Multiple Users</h1>
        <h5>This address allows any number of users to find companies they are interested in. Users can only see other companies.</h5>
      </Col>

      <Col xs={4}>
        <FileEarmarkTextFill size={100} />
        <h1>Company Details</h1>
        <h5>For each company, you can see their name, address, and skillsets.</h5>
      </Col>

      <Col xs={4}>
        <Calendar2CheckFill size={100} />
        <h1>Timestamped Notes</h1>
        <h5>You can write a notes that can indicate company interests. This note is saved along with a timestamp with on the profile.</h5>
      </Col>

    </Row>
  </Container>
);

export default Landing;
