import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The CompaniesCollection. It encapsulates state and variable values for Contacts.
 */
class CompaniesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'CompaniesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      logo: String,
      name: String,
      location: String,
      overview: String,
      positions: String,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the CompaniesCollection.
 * @type {CompaniesCollection}
 */
export const Companies = new CompaniesCollection();
