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

const addCompany = (company) => {
  console.log(`  Adding: ${company.name} (${company.owner})`);
  Companies.collection.insert(company);
};

if (Companies.collection.find().count() === 0) {
  if (Meteor.settings.defaultCompany) {
    console.log('Creating default student.');
    Meteor.settings.defaultCompany.forEach(company => addCompany(company));
  }
}
