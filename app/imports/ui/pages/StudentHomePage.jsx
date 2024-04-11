import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Contacts } from '../../api/contact/Contacts';
import LoadingSpinner from '../components/LoadingSpinner';
import Contact from '../components/Contact';
import { Notes } from '../../api/note/Notes';
import { Link } from 'react-router-dom';

/* Renders a table containing all of the Contact documents. Use <ContactItem> to render each row. */
const StudentHomePage = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, contacts, notes } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Contacts documents.
    const subscription = Meteor.subscribe(Contacts.userPublicationName);
    const subscription2 = Meteor.subscribe(Notes.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready();
    // Get the Contacts documents
    const contactItems = Contacts.collection.find({}).fetch();
    const noteItems = Notes.collection.find({}).fetch();
    return {
      contacts: contactItems,
      notes: noteItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>Student Home Page</h2>
          </Col>
          <Row xs={8} md={8} lg={8} className="justify-content-center">
            {contacts.map((contact) => (
              <Col key={contact.id} xs={32} md={16} lg={12}>
                <Contact contact={contact} notes={notes.filter(note => (note.contactId === contact._id))} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default StudentHomePage;
