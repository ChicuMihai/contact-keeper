const { Model } = require('objection');
const Password = require('objection-password')();
const BaseModel = require('./BaseModel');
const db = require('../database/db');
Model.knex(db);

class User extends Password(BaseModel) {
  static getTableName() {
    return 'users';
  }
}
module.exports = User;
