const BaseRoute = require("./base/baseRoute");
const Joi = require("joi");
const Boom = require("boom");

const Question = Joi.object().keys({
  _id: Joi.string(),
  status: Joi.string(),
  description: Joi.string(),
  options: Joi.string(),
  creationDate: Joi.date(),
  modifiedDate: Joi.date(),
  __v: Joi.number(),
});

class QuestionRoutes extends BaseRoute {
  constructor(db) {
    super();
    this.db = db;
  }

  create() {
    return {
      path: "/api/questions",
      method: "POST",
      options: {
        handler: async (request, headers) => {
          try {
            const { status, description, options } = request.payload;
            return await this.db.create({ status, description, options });
          } catch (error) {
            console.log({ error });
            return Boom.internal();
          }
        },
        description: "Create question",
        notes:
          "Returns the question created using payload parameters status, description, and options",
        plugins: {
          "hapi-swagger": {
            responses: {
              200: {
                description: "Success",
                schema: Joi.object().keys({
                  _id: Joi.string(),
                  status: Joi.string(),
                  description: Joi.string(),
                  options: Joi.string(),
                  creationDate: Joi.date(),
                  modifiedDate: Joi.date(),
                  __v: Joi.number(),
                }),
              },
            },
            payloadType: "form",
          },
        },
        tags: ["api", "questions"],
        validate: {
          payload: Joi.object({
            status: Joi.string().required().description("Question status"),
            description: Joi.string()
              .required()
              .description("Question description"),
            options: Joi.string()
              .default("")
              .description("Question optional aditions"),
          }),
        },
      },
    };
  }

  list() {
    return {
      path: "/api/questions",
      method: "GET",
      options: {
        handler: (request, headers) => {
          try {
            return this.db.read();
          } catch (error) {
            console.log({ error });
            return Boom.internal();
          }
        },
        description: "Get questions list",
        notes: "Returns a list of questions",
        plugins: {
          "hapi-swagger": {
            responses: {
              200: {
                description: "Success",
                schema: Joi.array().items(Question),
              },
            },
            payloadType: "form",
          },
        },
        tags: ["api", "questions"],
      },
    };
  }

  getOne() {
    return {
      path: "/api/questions/{id}",
      method: "GET",
      options: {
        handler: async (request, headers) => {
          try {
            const { id } = request.params;
            const result = await this.db.find(id);
            return result ? result : {};
          } catch (error) {
            console.log({ error });
            return Boom.internal();
          }
        },
        description: "Get question",
        notes: "Returns a question using path parameter id",
        plugins: {
          "hapi-swagger": {
            responses: {
              200: {
                description: "Success",
                schema: Joi.object().keys({
                  _id: Joi.string(),
                  status: Joi.string(),
                  description: Joi.string(),
                  options: Joi.string(),
                  creationDate: Joi.date(),
                  modifiedDate: Joi.date(),
                  __v: Joi.number(),
                }),
              },
            },
            payloadType: "form",
          },
        },
        tags: ["api", "questions"],
        validate: {
          params: Joi.object({
            id: Joi.string().description("Question's id"),
          }),
        },
      },
    };
  }

  update() {
    return {
      path: "/api/questions/{id}",
      method: "PATCH",
      options: {
        handler: async (request, headers) => {
          try {
            const { id } = request.params;
            const { payload } = request;
            const stringData = JSON.stringify(payload);
            let data = JSON.parse(stringData);
            data = { ...data, modifiedDate: Date.now() };
            const result = await this.db.update(id, data);
            return result.n === 1
              ? { _id: id, message: "question updated successfully" }
              : { _id: id, message: "question couldn't be updated" };
          } catch (error) {
            console.log({ error });
            return Boom.internal();
          }
        },
        description: "Update question",
        notes:
          "Updates a question using path parameter id and payload parameters status, description, and options",
        plugins: {
          "hapi-swagger": {
            responses: {
              200: {
                description: "Success",
                schema: Joi.object().keys({
                  _id: Joi.string(),
                  message: Joi.string(),
                }),
              },
            },
            payloadType: "form",
          },
        },
        tags: ["api", "questions"],
        validate: {
          payload: Joi.object({
            status: Joi.string().description("Question status"),
            description: Joi.string().description("Question description"),
            options: Joi.string()
              .default("")
              .description("Question optional aditions"),
          }),
          params: Joi.object({
            id: Joi.string().description("Question's id"),
          }),
        },
      },
    };
  }

  delete(id) {
    return {
      path: "/api/questions/{id}",
      method: "DELETE",
      options: {
        handler: async (request, headers) => {
          try {
            const { id } = request.params;
            const result = await this.db.delete(id);
            return result.n === 1
              ? { _id: id, message: "question deleted successfully" }
              : { _id: id, message: "question couldn't be deleted" };
          } catch (error) {
            console.log({ error });
            return Boom.internal();
          }
        },
        description: "Delete question",
        notes: "Deletes a question using path parameter id",
        plugins: {
          "hapi-swagger": {
            responses: {
              200: {
                description: "Success",
                schema: Joi.object().keys({
                  _id: Joi.string(),
                  message: Joi.string(),
                }),
              },
            },
            payloadType: "form",
          },
        },
        tags: ["api", "questions"],
        validate: {
          params: Joi.object({
            id: Joi.string().description("Question's id"),
          }),
        },
      },
    };
  }
}

module.exports = QuestionRoutes;
