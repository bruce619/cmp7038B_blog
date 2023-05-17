const { Model } = require("objection");

// Two Factor model.
class TwoFA extends Model {
    static get tableName() {
      return 'two_fa';
    }
}

module.exports = TwoFA;