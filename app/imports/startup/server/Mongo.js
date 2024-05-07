import { Meteor } from 'meteor/meteor';
import { Contacts } from '../../api/contact/Contacts';
import { Students } from '../../api/student/Students';
import { Companies } from '../../api/company/Companies';

/* eslint-disable no-console */

const addContact = (contact) => {
  console.log(`  Adding: ${contact.lastName} (${contact.owner})`);
  Contacts.collection.insert(contact);
};

if (Contacts.collection.find().count() === 0) {
  if (Meteor.settings.defaultContacts) {
    console.log('Creating default contacts.');
    Meteor.settings.defaultContacts.forEach(contact => addContact(contact));
  }
}

const addStudent = (student) => {
  console.log(`  Adding: ${student.lastName} (${student.owner})`);
  Students.collection.insert(student);
};

if (Students.collection.find().count() === 0) {
  if (Meteor.settings.defaultStudent) {
    console.log('Creating default student.');
    Meteor.settings.defaultStudent.forEach(student => addStudent(student));
  }
}

const addCompany = (company) => {
  console.log(`  Adding: ${company.name} (${company.owner})`);
  Companies.collection.insert(company);
};

if (Students.collection.find().count() === 0) {
  if (Meteor.settings.defaultCompany) {
    console.log('Creating default company.');
    Meteor.settings.defaultCompany.forEach(company => addCompany(company));
  }
}

const deleteStudent = (student) => {
  console.log(`  Deleting: ${student.lastName} (${student.owner})`);
  Students.collection.deleteOne(student);
};
