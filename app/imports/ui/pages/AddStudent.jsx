import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap'; // Import Form and FormCheck
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Students } from '../../api/student/Students';

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
const AddStudent = () => {
  // On submit, insert the data.
  const submit = (student, formRef) => {
    const { firstName, lastName, address, image, description, interests, resume, school } = student;
    const owner = Meteor.user().username;
    Students.collection.insert(
      { firstName, lastName, address, image, description, interests, resume, school, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
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
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddStudent;
