const { Model } = require('objection');
const BaseModel = require('./BaseModel');
const User = require('./User');
const db = require('../database/db');

Model.knex(db);

class Contact extends BaseModel {
  static getTableName() {
    return 'contacts';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'contacts.user_id',
          to: 'users.id'
        }
      }
    };
  }
}
module.exports = Contact;
