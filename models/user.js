const Joi = require('joi');
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

  // get email
  email() {
    return this.email;
  }

  // get verification token
  token() {
    return this.token;
  }

  static get jsonSchema() {
    return     Joi.object({
      first_name: Joi.string().min(2).max(255)
      .pattern(new RegExp('^[a-zA-Z]+$'))
      .messages({
        'string.pattern.base': 'Invalid name entry'
      })
      .required(),
      last_name: Joi.string().min(2).max(255)
      .pattern(new RegExp('^[a-zA-Z]+$'))
      .messages({
        'string.pattern.base': 'Invalid name entry'
      })
      .required(),
      email: Joi.string().email().required(),
      username: Joi.string().alphanum().min(3).max(55).required(),
      password: Joi.string()
      .pattern(new RegExp('^(?=.*[A-Z])(?=.*\d)(?=.*[$@#])[A-Za-z\d$@#]{8,}$'))
      .messages({
          'string.pattern.base': 'Password must cointain a minimum of 8, and contain at least one capital letter, one number, and one of the special characters $, @, or #'
      })
      .required()
      // confirm_password: Joi.any().valid(Joi.ref('password')).required().messages({
      //     'any.only': 'Passwords do not match'
      //   })
  })

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

  // get email
  email() {
    return this.email;
  }

  // get verification token
  token() {
    return this.token;
  }

  static get jsonSchema() {
    return     Joi.object({
      first_name: Joi.string().min(2).max(255).required(),
      last_name: Joi.string().min(2).max(255).required(),
      email: Joi.string().email().required(),
      username: Joi.string().alphanum().min(3).max(55).required(),
      password: Joi.string()
      .pattern(new RegExp('^(?=.*[A-Z])(?=.*\d)(?=.*[$@#])[A-Za-z\d$@#]{8,}$'))
      .messages({
          'string.pattern.base': 'Password must cointain a minimum of 8, and contain at least one capital letter, one number, and one of the special characters $, @, or #'
      })
      .required(),
      confirm_password: Joi.any().valid(Joi.ref('password')).required().messages({
          'any.only': 'Passwords do not match'
        })
  })

  }


}

module.exports = {
  User,
  UserTemp
}
