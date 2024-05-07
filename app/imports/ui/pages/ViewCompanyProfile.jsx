import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Stack } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Companies } from '../../api/company/Companies';
import LoadingSpinner from '../components/LoadingSpinner';
import CompanyView from '../components/CompanyView';
import { Notes } from '../../api/note/Notes';

/* Renders a table containing View Student Profile. Use <ContactItem> to render each row. */
const ViewCompanyProfile = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, companies, notes } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Student documents.
    const subscription = Meteor.subscribe(Companies.userPublicationName);
    const subscription2 = Meteor.subscribe(Notes.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready();
    // Get the Students documents
    const companyItems = Companies.collection.find({}).fetch();
    const noteItems = Notes.collection.find({}).fetch();

    return {
      companies: companyItems,
      notes: noteItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Row xs={1} md={1} lg={1} className="g-4">
            {companies.map((company) => (<Col key={company._id}><CompanyView company={company} notes={notes.filter(note => (note.contactId === company._id))} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ViewCompanyProfile;
