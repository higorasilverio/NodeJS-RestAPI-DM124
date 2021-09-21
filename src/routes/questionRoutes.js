const BaseRoute = require("./base/baseRoute");
const Joi = require("joi");
const Boom = require("boom");

const {
  QuestionSchema,
  PathParam,
  Message,
  Headers,
} = require("../utils/joiObjectUtils");

const UpdateHelper = require("../helpers/updateHelper");

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
                schema: QuestionSchema,
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
          headers: Headers,
        },
      },
    };
  }

  list() {
    return {
      path: "/api/questions",
      method: "GET",
      options: {
        handler: async (request, headers) => {
          try {
            return await this.db.read();
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
                schema: Joi.array().items(QuestionSchema),
              },
            },
            payloadType: "form",
          },
        },
        tags: ["api", "questions"],
        validate: {
          headers: Headers,
        },
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
                schema: QuestionSchema,
              },
            },
            payloadType: "form",
          },
        },
        tags: ["api", "questions"],
        validate: {
          params: PathParam,
          headers: Headers,
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
            const previousPayload = await this.db.find(id);
            const data = UpdateHelper.provideCorrectPayload(
              "question",
              payload,
              previousPayload
            );
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
                schema: Message,
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
          params: PathParam,
          headers: Headers,
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
                schema: Message,
              },
            },
            payloadType: "form",
          },
        },
        tags: ["api", "questions"],
        validate: {
          params: PathParam,
          headers: Headers,
        },
      },
    };
  }
}

module.exports = QuestionRoutes;
