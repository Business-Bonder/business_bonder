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
      <Image src={company.image} width={75} />
      <Card.Title>{company.name}</Card.Title>
      <Card.Subtitle>{company.address}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">{company.description}</li>
        <li className="list-group-item">{company.interests}</li>
        <li className="list-group-item">
          <a href={company.companylink} className="btn btn-primary">Company Link</a>
        </li>

      </ul>

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
  company: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    interests: PropTypes.string,
    companylink: PropTypes.string,
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

export default Company;
