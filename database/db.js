const Knex = require('knex');
const { Model } = require('objection');
const environment = process.env.NODE_ENV || 'development';
const knexfile = require('../knexfile')[environment];
const knex = Knex(knexfile);
module.exports = knex;
