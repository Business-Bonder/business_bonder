import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';

/** Defines the Student information template. */
const Student = ({ student }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={student.image} width={75} />
      <Card.Title>{student.firstName} {Student.lastName}</Card.Title>
      <Card.Subtitle>{student.address}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{student.description}</Card.Text>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
Student.propTypes = {
  student: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    address: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default Student;
