const { Model } = require("objection");
const { hashPassword, comparePassword } = require("../utility/utils");
const Joi = require('joi')

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[$@#])[A-Za-z\d$@#]{8,20}$/;

// User Temp model.
class UserTemp extends Model {

    // Tbale name is the only rquired property
    static get tableName() {
      return 'user_temp';
    }

    // identifier column for the model
    // the default is 'id'
    static get idColumn() {
        return 'id';
      }

    fullName(){
        return this.first_name + ' ' + this.last_name;
    }

    email(){
        return this.email;
    }

    async setPassword(password){
      this.password = await hashPassword(password);
    }

    async comparePassword(password){
      return await comparePassword(password, this.password);
    }

  // Optional JSON schema. This is not the database schema!
  // No tables or columns are generated based on this. This is only
  // used for input validation. Whenever a model instance is created
  // either explicitly or implicitly it is checked against this schema.
  // See http://json-schema.org/ for more info.

  static get jsonSchema() {
    return Joi.object({
      first_name: Joi.string().min(3).max(255).required(),
      last_name: Joi.string().min(3).max(255).required(),
      username: Joi.string().pattern(new RegExp('^[a-zA-Z0-9@\\$]{3,30}$')).min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(passwordRegex).required().message({
        'string.pattern.base': 'Password must contain at least one uppercase letter, one number, and one special character ($, @, #) with a minimum of 8 and a maximum of 20 characters',
        'string.empty': 'Password is required',
        'any.required': 'Password is required'
      })
    })

  }

}

module.exports = UserTemp;