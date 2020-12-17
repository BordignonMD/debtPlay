exports.up = function(knex) {
    return knex.schema.createTable('user', function(table){
      table.increments('id_user')
      table.string('name').notNullable().unique()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.string('salt').notNullable()
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('user')
  };