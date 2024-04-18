import { Meteor } from 'meteor/meteor';
import { Contacts } from '../../api/contact/Contacts';
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
  Companies.collection.insert(student);
};

if (Companies.collection.find().count() === 0) {
  if (Meteor.settings.defaultStudent) {
    console.log('Creating default student.');
    Meteor.settings.defaultStudent.forEach(student => addStudent(student));
  }
}
