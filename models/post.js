const { Model } = require("objection");

// Post model.
class Post extends Model {
    static get tableName() {
      return 'posts';
    }
}

module.exports = Post;