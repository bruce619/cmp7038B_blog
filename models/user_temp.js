const { Model } = require("objection");


// User model.
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

    emailAddr(){
        return this.emailAddr;
    }
}

module.export = UserTemp;