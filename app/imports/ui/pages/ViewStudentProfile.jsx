import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Stack } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Students } from '../../api/student/Students';
import LoadingSpinner from '../components/LoadingSpinner';
import StudentView from '../components/StudentView';
import { Notes } from '../../api/note/Notes';

/* Renders a table containing View Student Profile. Use <ContactItem> to render each row. */
const ViewStudentProfile = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, students, notes } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Student documents.
    const subscription = Meteor.subscribe(Students.userPublicationName);
    const subscription2 = Meteor.subscribe(Notes.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready();
    // Get the Students documents
    const studentItems = Students.collection.find({}).fetch();
    const noteItems = Notes.collection.find({}).fetch();

    return {
      students: studentItems,
      notes: noteItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Row xs={1} md={1} lg={1} className="g-4">
            {students.map((student) => (<Col key={student.id}><StudentView student={student} notes={notes.filter(note => (note.contactId === student._id))} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ViewStudentProfile;
