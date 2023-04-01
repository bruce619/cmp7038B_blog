// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> } 

const { getRandomAlphanumericString, hashPassword } = require("../../utility/utils");
const { checkEmail } = require("../../utility/validations");


exports.seed = async function(knex) {
  // truncate existing tables
  await knex.raw('TRUNCATE TABLE "posts" CASCADE');
  await knex.raw('TRUNCATE TABLE "two_fa" CASCADE');
  await knex.raw('TRUNCATE TABLE "users" CASCADE');
  await knex.raw('TRUNCATE TABLE "user_temp" CASCADE');

  // Insert new entries in user table
  await knex('users').insert([
    // {id: 1, colName: 'rowValue1'},
    // {id: 2, colName: 'rowValue2'},
    // {id: 3, colName: 'rowValue3'}
    {
      first_name: "Chimuanya",
      last_name: "Ibecheozor",
      username: "Bruce619",
      email: checkEmail("chimuanyaibecheozor@gmail.com"),
      password: hashPassword("Codex@24")
    },
    {
      first_name: "Halima",
      last_name: "Abdulazeez",
      username: "Hali4life",
      email: checkEmail("haleemabello04@yahoo.com"),
      password: hashPassword("Trex$$12")
    },
    {
      first_name: "Oluwaseun",
      last_name: "Ajani",
      username: "Olseun",
      email: checkEmail("seunajanik@yahoo.com"),
      password: hashPassword("Izanami04$$")
    }
  ]);

  return knex('user_temp').insert([
    {
      first_name: "Chimuanya",
      last_name: "Ibecheozor",
      username: "Bruce619",
      email: checkEmail("chimuanyaibecheozor@gmail.com"),
      password: hashPassword("Codex@24"),
      token: getRandomAlphanumericString(30)
    },
    {
      first_name: "Halima",
      last_name: "Abdulazeez",
      username: "Hali4life",
      email: checkEmail("haleemabello04@yahoo.com"),
      password: hashPassword("Trex$$12"),
      token: getRandomAlphanumericString(30)
    },
    {
      first_name: "Oluwaseun",
      last_name: "Ajani",
      username: "Olseun",
      email: checkEmail("seunajanik@yahoo.com"),
      password: hashPassword("Izanami04$$"),
      token: getRandomAlphanumericString(30)
    }
  ]);
};
