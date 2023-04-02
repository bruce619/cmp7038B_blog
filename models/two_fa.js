const { Model } = require("objection");


// User model.
class TwoFA extends Model {
    static get tableName() {
      return 'two_fa';
    }
}

module.export = TwoFA;