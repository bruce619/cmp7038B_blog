const { Model } = require('objection');


// temp user model
class UserTemp extends Model {
  static get tableName() {
    return 'user_temp'
  }

  // method to get full name
  fullName() {
    return this.firstName + ' ' + this.lastName;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['first_name', 'last_name', 'email', 'username', 'password', 'token'],

      properties: {
        id: { type: 'integer' },
        firstName: { type: 'string', minLength: 1, maxLength: 200 },
        lastName: { type: 'string', minLength: 1, maxLength: 200 },
        email: { type: 'string', pattern: '^[^\s@]+@[^\s@]+\.[^\s@]+$', minLength: 11 },
        username: { type: 'string', minLength: 3, maxLength: 55 },
        password: { type: 'string', minLength: 8},
        token: {type: 'string', maxLength: 30},
        created_at: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$'},
      }
    }
  }

}


// main User model.
class User extends Model {
  static get tableName() {
    return 'users';
  }

  // method to get full name
  fullName() {
    return this.firstName + ' ' + this.lastName;
  }

  static get relationMappings (){
    
    const Post = require('./post');

    return {
      posts: {
        relation: Model.HasManyRelation,
        modelClass: Post,
        join: {
          from: 'users.id',
          to: 'posts.author'
        }
      }
    }
  }
  
}

module.exports = {
  User,
  UserTemp
}
