import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Company table. See pages/ListCompanies.jsx. */
const CompanySuggest = ({ company }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={company.image} width={75} />
      <Card.Title>{company.name}</Card.Title>
      <Card.Subtitle>{company.address}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>
        {company.description}
        <p>
          <Link to={`/edit/${company._id}`}>View Company Profile</Link>
        </p>
      </Card.Text>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
CompanySuggest.propTypes = {
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
};

export default CompanySuggest;
