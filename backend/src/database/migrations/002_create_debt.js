exports.up = function(knex) {
    return knex.schema.createTable('debt', function(table){
      table.increments('id_debt')
      table.integer('id_client').notNullable()
      table.string('name_client').notNullable()
      table.string('reason').notNullable()
      table.date('date').notNullable()
      table.decimal('value').notNullable()
      table.integer('id_user').notNullable()
      table.foreign('id_user').references('id_user').inTable('user')
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('debt')
  };