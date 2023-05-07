const Joi = require("joi");
const { Model } = require("objection");

// Post model.
class Post extends Model {
    static get tableName() {
      return 'posts';
    }

    title() {
      return this.title;
    }

    static get jsonSchema() {
      return Joi.object({
        title: Joi.string().min(2).max(50).pattern(new RegExp('^[a-zA-Z0-9,:\.]+$'))
        .messages({
          'string.pattern.base': 'invalid title entry'
        })
        .required(),
        body: Joi.string().required()
      })

    }
}

module.exports = Post;