import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Note from './Note';
import AddNote from './AddNote';

/** Renders a single row in the List Contact table. See pages/ListContacts.jsx. */
const Student = ({ student, notes }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={student.image} width={75} />
      <Card.Title>{student.firstName} {student.lastName}</Card.Title>
      <Card.Subtitle>{student.address}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">{student.description}</li>
        <li className="list-group-item">{student.interests}</li>
        <li className="list-group-item">
          <a href={student.resume} className="btn btn-primary">My Resume</a>
        </li>

      </ul>

      <ListGroup variant="flush">
        {notes.map((note) => <Note key={note._id} note={note} />)}
      </ListGroup>
      <AddNote owner={student.owner} contactId={student._id} />
      <p>
        <Link to={`/edit/${student._id}`}>Edit</Link>
      </p>
      <Link to={`/viewstudent/${student._id}`}>View Student Profile</Link>

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
    interests: PropTypes.string,
    resume: PropTypes.string,
    school: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string), // Update prop types to include skills
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  notes: PropTypes.arrayOf(PropTypes.shape({
    note: PropTypes.string,
    contactId: PropTypes.string,
    owner: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
    _id: PropTypes.string,
  })).isRequired,
};

export default Student;
