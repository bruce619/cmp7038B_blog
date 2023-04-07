const { Model } = require("objection");

// User model.
class Post extends Model {
    static get tableName() {
      return 'posts';
    }
}

module.export = Post;