exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table
      .string('name')
      .unique()
      .notNullable();
    table
      .string('email')
      .unique()
      .notNullable();
    table
      .string('password')
      .unique()
      .notNullable();
    table.dateTime('createdAt').notNullable();
    table.dateTime('updatedAt').notNullable();
  });
};

exports.down = knex => knex.schema.dropTable('users');
