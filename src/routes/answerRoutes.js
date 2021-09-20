const BaseRoute = require("./base/baseRoute");
const Joi = require("joi");
const Boom = require("boom");

const {
  Message,
  AnswerSchema,
  PathParam,
  Headers,
} = require("../utils/joiObjectUtils");

class AnswerRoutes extends BaseRoute {
  constructor(db) {
    super();
    this.db = db;
  }

  create() {
    return {
      path: "/api/answers",
      method: "POST",
      options: {
        handler: async (request, headers) => {
          try {
            const { key, name, answer, questionId } = request.payload;
            return await this.db.create({ key, name, answer, questionId });
          } catch (error) {
            console.log({ error });
            return Boom.internal();
          }
        },
        description: "Create answer",
        notes:
          "Returns the answer created using payload parameters questionId, key, name, and answer",
        plugins: {
          "hapi-swagger": {
            responses: {
              200: {
                description: "Success",
                schema: AnswerSchema,
              },
            },
            payloadType: "form",
          },
        },
        tags: ["api", "answers"],
        validate: {
          payload: Joi.object({
            questionId: Joi.string()
              .required()
              .description("Question's id related to this answer"),
            key: Joi.string().required().description("Answer search key"),
            name: Joi.string().required().description("Answer source name"),
            answer: Joi.string().required().description("Proper answer"),
          }),
          headers: Headers,
        },
      },
    };
  }

  list() {
    return {
      path: "/api/answers",
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
        description: "Get answers list",
        notes: "Returns a list of answers",
        plugins: {
          "hapi-swagger": {
            responses: {
              200: {
                description: "Success",
                schema: Joi.array().items(AnswerSchema),
              },
            },
            payloadType: "form",
          },
        },
        tags: ["api", "answers"],
        validate: {
          headers: Headers,
        },
      },
    };
  }

  getOne() {
    return {
      path: "/api/answers/{id}",
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
        description: "Get answer",
        notes: "Returns an answer using path parameter id",
        plugins: {
          "hapi-swagger": {
            responses: {
              200: {
                description: "Success",
                schema: AnswerSchema,
              },
            },
            payloadType: "form",
          },
        },
        tags: ["api", "answers"],
        validate: {
          params: PathParam,
          headers: Headers,
        },
      },
    };
  }

  update() {
    return {
      path: "/api/answers/{id}",
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
              ? { _id: id, message: "answer updated successfully" }
              : { _id: id, message: "answer couldn't be updated" };
          } catch (error) {
            console.log({ error });
            return Boom.internal();
          }
        },
        description: "Update answer",
        notes:
          "Updates an answer using path parameter id and payload parameters questionId, key, name, and answer",
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
        tags: ["api", "answers"],
        validate: {
          payload: Joi.object({
            questionId: Joi.string().description(
              "Question's id related to this answer"
            ),
            key: Joi.string().description("Answer search key"),
            name: Joi.string().description("Answer source name"),
            answer: Joi.string().description("Proper answer"),
          }),
          params: PathParam,
          headers: Headers,
        },
      },
    };
  }

  delete(id) {
    return {
      path: "/api/answers/{id}",
      method: "DELETE",
      options: {
        handler: async (request, headers) => {
          try {
            const { id } = request.params;
            const result = await this.db.delete(id);
            return result.n === 1
              ? { _id: id, message: "answer deleted successfully" }
              : { _id: id, message: "answer couldn't be deleted" };
          } catch (error) {
            console.log({ error });
            return Boom.internal();
          }
        },
        description: "Delete answer",
        notes: "Deletes an answer using path parameter id",
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
        tags: ["api", "answers"],
        validate: {
          params: PathParam,
          headers: Headers,
        },
      },
    };
  }
}

module.exports = AnswerRoutes;
