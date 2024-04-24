import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { Students } from '../../api/student/Students';

const skillsArray = ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4']; // Predetermined skills array

const bridge = new SimpleSchema2Bridge(Students.schema.extend({
  skills: {
    type: Array,
    optional: true,
  },
  'skills.$': {
    type: String,
    allowedValues: skillsArray, // Limit values to the predetermined skills
  },
}));

const EditStudent = () => {
  const { _id } = useParams();
  const { doc, ready } = useTracker(() => {
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
    Students.collection.update(_id, { $set: { firstName, lastName, address, image, description, interests, resume, school } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  };

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Edit Student</h2></Col>
          <AutoForm schema={bridge} onSubmit={student => submit(student)} model={doc}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField name="firstName" /></Col>
                  <Col><TextField name="lastName" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="address" /></Col>
                  <Col><TextField name="image" /></Col>
                </Row>
                <TextField name="description" />
                <TextField name="interests" />
                <Row>
                  <Col><TextField name="resume" /></Col>
                  <Col><TextField name="school" /></Col>
                </Row>
                <SubmitField value="Submit" />
                <ErrorsField />
                <HiddenField name="owner" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditStudent;
