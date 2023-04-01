// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */

exports.up = function(knex) {

    return knex.schema
    .createTable('users', function(table) {
        table.uuid('id').defaultTo(knex.raw('gen_random_uuid ()')).primary();
        table.string('first_name', 255).notNullable().index();
        table.string('last_name', 255).notNullable().index();
        table.string('email')
        .unique()
        .notNullable()
        .index()
        .comment('this is the email field');
        table.string('username', 100).unique().notNullable().index();
        table.boolean('admin').defaultTo(false);
        table.boolean('is_verified').defaultTo(false);
        table.boolean('two_fa_enabled').defaultTo(false);
        table.string('profile_picture')
        .defaultTo('../../uploads/default.jpg');
        table.string('location');
        table.date('dob').nullable();
        table.string('bio').nullable();
        table.string('password').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('user_temp', function(table) {
        table.increments('id').primary();
        table.string('first_name', 255).notNullable().index();
        table.string('last_name', 255).notNullable().index();
        table.string('email')
        .unique()
        .notNullable()
        .comment('this is the email field');
        table.string('username', 100).unique().notNullable();
        table.string('password').notNullable();
        table.string('token').nullable();
    })
    .createTable('two_fa', function(table) {
        table.increments('id').primary();
        table.string('otp', 100).notNullable();
        table.boolean('is_used').notNullable().defaultTo(false)
        table.timestamp('expiration_time').notNullable();
        // this is a one to one relationship implementation referencing the user table
        table.uuid('user_id')
        .unsigned()
        .unique()
        .references('id')
        .inTable('users');
    })
    .createTable('posts', function(table) {
        table.uuid('id').defaultTo(knex.raw('gen_random_uuid ()')).primary();
        table.string('title', 30).notNullable().index();
        table.string('body');
        // reference the 'users' primary key in new table 'posts'
        table.uuid('author')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        // create a timestamp when author posts
        // update the timestamp on update
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
  
};


exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('two_fa')
  .dropTableIfExists('posts')
  .dropTableIfExists('users')
  .dropTableIfExists('user_temp')
};
