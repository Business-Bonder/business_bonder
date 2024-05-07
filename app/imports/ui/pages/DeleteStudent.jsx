import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap'; // Import Form and FormCheck
import { AutoForm, ErrorsField, SubmitField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Students } from '../../api/student/Students';
import { useParams } from 'react-router';

// Create a schema to specify the structure of the student to appear in the form.
const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  address: String,
  image: String,
  description: String,
  interests: String,
  resume: String,
  school: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStudent page for adding a document. */
const DeleteStudent = () => {
  const { _id } = useParams();
  const { ready } = useTracker(() => {
    const subscription = Meteor.subscribe(Students.userPublicationName);
    const rdy = subscription.ready();
    const document = Students.collection.findOne(_id);
    // Initialize studentSkills state with existing skills from the document
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  const submit = (student) => {
    const { firstName, lastName, address, image, description, interests, resume, school } = student; // Use updated skills array from state
    Students.collection.deleteOne(_id, { $set: { firstName, lastName, address, image, description, interests, resume, school } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Create Student Profile</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={student => submit(student, fRef)}>
            <Card>
              <Card.Body>
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default DeleteStudent;
