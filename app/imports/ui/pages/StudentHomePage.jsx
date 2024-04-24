import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Stack } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Students } from '../../api/student/Students';
import LoadingSpinner from '../components/LoadingSpinner';
import Student from '../components/Student';
import { Notes } from '../../api/note/Notes';
import CompanySuggest from '../components/CompanySuggest';
import { Companies } from '../../api/company/Companies';

/* Renders a table containing all of the Contact documents. Use <ContactItem> to render each row. */
const StudentHomePage = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, students, notes, companies } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Student documents.
    const subscription = Meteor.subscribe(Students.userPublicationName);
    const subscription2 = Meteor.subscribe(Notes.userPublicationName);
    const subscription3 = Meteor.subscribe(Companies.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready() && subscription3.ready();
    // Get the Students documents
    const studentItems = Students.collection.find({}).fetch();
    const noteItems = Notes.collection.find({}).fetch();
    const companyItems = Companies.collection.find({}).fetch();
    return {
      students: studentItems,
      notes: noteItems,
      ready: rdy,
      companies: companyItems,
    };
  }, []);

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Row xs={1} md={1} lg={1} className="g-4">
            {students.map((student) => (<Col key={student.id}><Student student={student} notes={notes.filter(note => (note.contactId === student._id))} /></Col>))}
          </Row>
        </Col>
        <Col>
          <Stack gap={2}>
            <Row xs={2} md={2} lg={2} className="justify-content-center">
              <a href="/home" className="btn btn-primary">Search Companies</a>
            </Row>
            <Row className="justify-content-center">
              <Col style={{ display: 'flex', justifyContent: 'center' }}>
                <h2>Recommended For You</h2>
              </Col>
            </Row>
            <Row xs={1} md={1} lg={1} className="g-4">
              {companies.map((company) => (
                <Col key={company.id}>
                  <CompanySuggest
                    company={company}
                    notes={notes.filter(note => note.contactId === company._id)}
                  />
                </Col>
              ))}
            </Row>
          </Stack>
        </Col>

      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default StudentHomePage;
