import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap'; // Import Form and FormCheck
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Companies } from '../../api/company/Companies';

// Create a schema to specify the structure of the company to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  address: String,
  image: String,
  description: String,
  interests: String,
  companylink: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddCompany page for adding a document. */
const AddCompany = () => {
  // On submit, insert the data.
  const submit = (company, formRef) => {
    const { name, address, image, description, interests, companylink } = company;
    const owner = Meteor.user().username;
    Companies.collection.insert(
      { name, address, image, description, interests, companylink, owner },
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
          <Col className="text-center"><h2>Create Company Profile</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={company => submit(company, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField name="name" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="address" /></Col>
                  <Col><TextField name="image" /></Col>
                </Row>
                <TextField name="description" />
                <TextField name="interests" />
                <Row>
                  <Col><TextField name="companylink" /></Col>
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

export default AddCompany;
