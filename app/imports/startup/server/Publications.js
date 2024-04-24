import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Contacts } from '../../api/contact/Contacts';
import { Notes } from '../../api/note/Notes';
import { Students } from '../../api/student/Students';
// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise, publish nothing.

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

Meteor.publish(Contacts.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Contacts.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Contacts.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Contacts.collection.find();
  }
  return this.ready();
});

Meteor.publish(Notes.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Notes.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Notes.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Notes.collection.find();
  }
  return this.ready();
});

Meteor.publish(Students.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Students.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Students.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Students.collection.find();
  }
  return this.ready();
});
