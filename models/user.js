const { Model } = require("objection");
const Password = require("objection-password")();
const BaseModel = require("./BaseModel");
const Contact = require("./Contact");
const db = require("../database/db");
Model.knex(db);

class User extends Password(BaseModel) {
  static getTableName() {
    return "users";
  }
  static get relationMappings() {
    return {
      contacts: {
        relation: Model.HasManyRelation,
        modelClass: Contact,
        join: {
          from: "users.id",
          to: "contacts.user_id"
        }
      }
    };
  }
}
module.exports = User;
