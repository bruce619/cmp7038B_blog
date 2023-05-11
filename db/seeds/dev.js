// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> } 

const { getRandomAlphanumericString, hashPassword } = require("../../utility/utils");
const { checkEmail } = require("../../utility/validations");


exports.seed = async function(knex) {
  // truncate existing tables
  await knex.raw('TRUNCATE TABLE "posts" CASCADE');
  // await knex.raw('TRUNCATE TABLE "users" CASCADE');
  // await knex.raw('TRUNCATE TABLE "user_temp" CASCADE');

  // // Insert new entries in user table
  // await knex('users').insert([
  //   {
  //     first_name: "Chimuanya",
  //     last_name: "Ibecheozor",
  //     username: "Bruce619",
  //     email: checkEmail("chimuanyaibecheozor@gmail.com"),
  //     password: hashPassword("Codex@24")
  //   },
  //   {
  //     first_name: "Halima",
  //     last_name: "Abdulazeez",
  //     username: "Hali4life",
  //     email: checkEmail("haleemabello04@yahoo.com"),
  //     password: hashPassword("Trex$$12")
  //   },
  //   {
  //     first_name: "Oluwaseun",
  //     last_name: "Ajani",
  //     username: "Olseun",
  //     email: checkEmail("seunajanik@yahoo.com"),
  //     password: hashPassword("Izanami04$$")
  //   }
  // ]);

  // return knex('user_temp').insert([
  //   {
  //     first_name: "Chimuanya",
  //     last_name: "Ibecheozor",
  //     username: "Bruce619",
  //     email: checkEmail("chimuanyaibecheozor@gmail.com"),
  //     password: hashPassword("Codex@24"),
  //     token: getRandomAlphanumericString(30)
  //   },
  //   {
  //     first_name: "Halima",
  //     last_name: "Abdulazeez",
  //     username: "Hali4life",
  //     email: checkEmail("haleemabello04@yahoo.com"),
  //     password: hashPassword("Trex$$12"),
  //     token: getRandomAlphanumericString(30)
  //   },
  //   {
  //     first_name: "Oluwaseun",
  //     last_name: "Ajani",
  //     username: "Olseun",
  //     email: checkEmail("seunajanik@yahoo.com"),
  //     password: hashPassword("Izanami04$$"),
  //     token: getRandomAlphanumericString(30)
  //   }
  // ]);

  return knex('posts').insert([
    {
      author: '58e5a9e2-d6a2-4a92-a272-f43413b2ffeb',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut lectus vitae odio dignissim volutpat. Sed porttitor ut quam quis lobortis.',
      title: 'Chimuanya Test post title 1'
    },
    {
      author: '8300f2ee-d571-4654-9ef3-3776d9802953',
      body: 'Maecenas at est malesuada, dapibus arcu vitae, bibendum quam. Nullam sed enim ut sapien mollis iaculis vel vel nisl. Nam porttitor tortor a ex placerat, ut interdum tellus pretium.',
      title: 'Test data title 2 by Seun'
    },
    {
      author: '2d9fe0ab-6b92-4ad6-8d24-fa5f26ccad08',
      body: 'Vivamus non augue ac dolor efficitur consequat. Duis id augue eleifend, malesuada libero sit amet, tempor turpis. Curabitur vel elit ac turpis iaculis iaculis id id augue. ',
      title: 'Test data title 3 by Halima' 
    },
    {
      author: '58e5a9e2-d6a2-4a92-a272-f43413b2ffeb',
      body: 'Fusce sem metus, facilisis vel imperdiet vel, pulvinar in ipsum. Phasellus rutrum purus nulla, at feugiat ipsum lacinia ut. Aliquam dictum suscipit justo, id tincidunt massa congue quis.',
      title: 'Test data title 5 by Chimuanya'
    }
  ]);


};
