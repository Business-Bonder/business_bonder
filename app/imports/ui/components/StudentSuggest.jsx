import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Students } from '../../api/student/Students';

/** Renders a single row in the List Company table. See pages/ListCompanies.jsx. */
const StudentSuggest = ({ student }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={student.image} width={75} />
      <Card.Title>{student.firstName} {student.lastName}</Card.Title>
      <Card.Subtitle>{student.address}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>
        {student.description}
        <p>
          <Link to={`/viewstudent/${student._id}`}>View Student Profile</Link>
        </p>
      </Card.Text>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
StudentSuggest.propTypes = {
  student: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    address: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    interests: PropTypes.string,
    resume: PropTypes.string,
    school: PropTypes.string,
    skills: PropTypes.string, // Update prop types to include skills
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default StudentSuggest;
