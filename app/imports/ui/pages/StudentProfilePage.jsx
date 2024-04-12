import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import Student from '../components/Student';
import { Students } from '../../api/student/Students';

/* Renders a table containing students. */
const ListStudents = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, students } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Contacts documents.
    const subscription = Meteor.subscribe(Students.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Contacts documents
    const studentItems = Students.collection.find({}).fetch();
    return {
      students: studentItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>List of Students</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {students.map((student) => (<Col key={student.id}><Student student={student} /></Col>))}
          </Row>

        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListStudents;
