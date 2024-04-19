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

/* Renders the EditStudent page for editing a single document. */
const EditStudent = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Student documents.
    const subscription = Meteor.subscribe(Students.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Students.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);

  // On successful submit, insert the data.
  const submit = (student) => {
    const { firstName, lastName, address, image, description, interests, resume, school, skills } = student;
    Students.collection.update(_id, { $set: { firstName, lastName, address, image, description, interests, resume, school, skills } }, (error) => (error ?
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
                <fieldset className="mb-3">
                  <legend>Skills:</legend>
                  {skillsArray.map((skill, index) => (
                    <div key={index} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`skill_${index}`}
                        name="skills"
                        value={skill}
                        defaultChecked={doc && doc.skills && doc.skills.includes(skill)}
                      />
                      <label className="form-check-label" htmlFor={`skill_${index}`}>
                        {skill}
                      </label>
                    </div>
                  ))}
                </fieldset>
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
