
exports.up = function(knex) {

    return knex.schema
    .createTable('users', function(table) {
        table.uuid('id').defaultTo(knex.raw('gen_random_uuid ()')).primary();
        table.string('first_name', 200).notNullable().index();
        table.string('last_name', 200).notNullable().index();
        table.string('email')
        .unique()
        .notNullable()
        .index()
        .comment('this is the email field');
        table.string('username', 55).unique().notNullable().index();
        table.boolean('admin').defaultTo(false);
        table.boolean('is_verified').defaultTo(false);
        table.boolean('two_fa_enabled').defaultTo(false);
        table.string('otp', 100)
        table.timestamp('expiration_time')
        table.boolean('is_used').defaultTo(false)
        table.string('profile_picture').defaultTo('/uploads/default-profile-image.jpg');
        table.string('location', 150); // needed so others can know where the post is being made from
        table.string('bio').nullable();
        table.string('password').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('user_temp', function(table) {
        table.increments('id').primary();
        table.string('first_name', 200).notNullable().index();
        table.string('last_name', 200).notNullable().index();
        table.string('email')
        .unique()
        .notNullable()
        .comment('this is the email field');
        table.string('username', 55).unique().notNullable();
        table.string('password').notNullable();
        table.string('token').nullable();
    })
    .createTable('posts', function(table) {
        table.uuid('id').defaultTo(knex.raw('gen_random_uuid ()')).primary();
        table.string('title', 50).notNullable().index();
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
  .dropTableIfExists('posts')
  .dropTableIfExists('users')
  .dropTableIfExists('user_temp')
};
