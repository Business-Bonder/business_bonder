import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Note from './Note';
import AddNote from './AddNote';

/** Renders a single row in the List Contact table. See pages/ListContacts.jsx. */
const Company = ({ company, notes }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={company.logo} width={75} />
      <Card.Title>{company.name}</Card.Title>
      <Card.Subtitle>{company.location}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{company.overview}</Card.Text>
      <Card.Text>{company.positions}</Card.Text>
      <ListGroup variant="flush">
        {notes.map((note) => <Note key={note._id} note={note} />)}
      </ListGroup>
      <AddNote owner={company.owner} contactId={company._id} />
      <Link to={`/edit/${company._id}`}>Edit</Link>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
Company.propTypes = {
  student: PropTypes.shape({
    logo: String,
    name: String,
    location: String,
    overview: String,
    positions: String,
  }).isRequired,
  notes: PropTypes.arrayOf(PropTypes.shape({
    note: PropTypes.string,
    contactId: PropTypes.string,
    owner: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
    _id: PropTypes.string,
  })).isRequired,
};

export default Company;
