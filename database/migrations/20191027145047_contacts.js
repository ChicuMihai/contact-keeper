exports.up = function(knex) {
  return knex.schema.createTable('contacts', t => {
    t.increments('id')
      .primary()
      .notNullable()
      .unique();
    t.string('name');
    t.string('email');
    t.string('phone');
    t.string('type');
    t.integer('user_id')
      .references('users.id')
      .unsigned();
    t.dateTime('createdAt').notNullable();
    t.dateTime('updatedAt').notNullable();
  });
};

exports.down = knex => knex.schema.dropTable('contacts');
