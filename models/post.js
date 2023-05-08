const { Model } = require("objection");

// Post model.
class Post extends Model {
    static get tableName() {
      return 'posts';
    }

    static get relationMappings(){
      const { User } = require("./user");

      return {
        user: {
          relation: Model.BelongsToOneRelation,
          modelClass: User,
          join: {
            from: 'posts.author',
            to: 'users.id'
          }
        }
      }
    }
}

module.exports = Post;