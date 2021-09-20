const Joi = require("joi");

module.exports = {
  QuestionSchema: Joi.object().keys({
    _id: Joi.string(),
    status: Joi.string(),
    description: Joi.string(),
    options: Joi.string(),
    creationDate: Joi.date(),
    modifiedDate: Joi.date(),
    __v: Joi.number(),
  }),
  AnswerSchema: Joi.object().keys({
    questionId: Joi.array().items(Joi.string()),
    _id: Joi.string(),
    key: Joi.string(),
    name: Joi.string(),
    answer: Joi.string(),
    creationDate: Joi.date(),
    modifiedDate: Joi.date(),
    __v: Joi.number(),
  }),
  UserSchema: Joi.object().keys({
    role: Joi.string(),
    _id: Joi.string(),
    name: Joi.string(),
    password: Joi.string(),
    creationDate: Joi.date(),
    modifiedDate: Joi.date(),
    __v: Joi.number(),
  }),
  Message: Joi.object().keys({
    _id: Joi.string(),
    message: Joi.string(),
  }),
  PathParam: Joi.object({
    id: Joi.string().description("Entity identifier from path param"),
  }),
  Headers: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
};
