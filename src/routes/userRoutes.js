const BaseRoute = require("./base/baseRoute");
const Joi = require("joi");
const Boom = require("boom");

class UserRoutes extends BaseRoute {
  constructor(db) {
    super();
    this.db = db;
  }

  create() {
    return {
      path: "/api/users",
      method: "POST",
      options: {
        handler: async (request, headers) => {
          try {
            let { name, role } = request.payload;
            role = role === "admin" ? "admin" : "user";
            return await this.db.create({ name, role });
          } catch (error) {
            console.log({ error });
            return Boom.internal();
          }
        },
        description: "Create user",
        notes:
          "Returns the user created using payloaf parameters name and role",
        plugins: {
          "hapi-swagger": {
            responses: {
              200: {
                description: "Success",
                schema: Joi.object().keys({
                  role: Joi.string(),
                  _id: Joi.string(),
                  name: Joi.string(),
                  creationDate: Joi.date(),
                  modifiedDate: Joi.date(),
                  __v: Joi.number(),
                }),
              },
            },
            payloadType: "form",
          },
        },
<<<<<<< HEAD
        tags: ["api", "users"],
=======
        tags: ["api"],
>>>>>>> dd322d892e0d2e59c32560be3bfd785db2fb9b2d
        validate: {
          payload: Joi.object({
            name: Joi.string().required().description("User's name"),
            role: Joi.string().default("user").description("User's role"),
          }),
        },
      },
    };
  }

  getOne() {
    return {
      path: "/api/users/{id}",
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
        description: "Get user",
        notes: "Returns one user using id path parameter",
        plugins: {
          "hapi-swagger": {
            responses: {
              200: {
                description: "Success",
                schema: Joi.object().keys({
                  role: Joi.string(),
                  _id: Joi.string(),
                  name: Joi.string(),
                  creationDate: Joi.date(),
                  modifiedDate: Joi.date(),
                  __v: Joi.number(),
                }),
              },
            },
            payloadType: "form",
          },
        },
<<<<<<< HEAD
        tags: ["api", "users"],
=======
        tags: ["api"],
>>>>>>> dd322d892e0d2e59c32560be3bfd785db2fb9b2d
      },
    };
  }

  update() {
    return {
      path: "/api/users/{id}",
      method: "PATCH",
      options: {
        handler: async (request, headers) => {
          try {
            const { id } = request.params;
            const { payload } = request;
            const stringData = JSON.stringify(payload);
            let data = JSON.parse(stringData);
            const result = data.role
              ? await this.db.update(id, {
                  role: data.role === "admin" ? "admin" : "user",
                  modifiedDate: Date.now(),
                })
              : Boom.preconditionFailed("Role parameter is missing");
            return result.n === 1
              ? { _id: id, message: "user's role updated successfully" }
              : { _id: id, message: "user's role couldn't be updated" };
          } catch (error) {
            console.log({ error });
            return Boom.internal();
          }
        },
        description: "Update user's role",
        notes:
          "Updates user's role using id path parameter and role payload parameter",
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
<<<<<<< HEAD
        tags: ["api", "users"],
=======
        tags: ["api"],
>>>>>>> dd322d892e0d2e59c32560be3bfd785db2fb9b2d
        validate: {
          payload: Joi.object({
            role: Joi.string().default("user").description("User's role"),
          }),
          params: Joi.object({
            id: Joi.string().description("User's id"),
          }),
        },
      },
    };
  }

  delete(id) {
    return {
      path: "/api/users/{id}",
      method: "DELETE",
      options: {
        handler: async (request, headers) => {
          try {
            const { id } = request.params;
            const result = await this.db.delete(id);
            return result.n === 1
              ? { _id: id, message: "user deleted successfully" }
              : { _id: id, message: "user couldn't be deleted" };
          } catch (error) {
            console.log({ error });
            return Boom.internal();
          }
        },
        description: "Delete user",
        notes: "Deletes user using id path parameter",
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
<<<<<<< HEAD
        tags: ["api", "users"],
=======
        tags: ["api"],
>>>>>>> dd322d892e0d2e59c32560be3bfd785db2fb9b2d
        validate: {
          params: Joi.object({
            id: Joi.string().description("User's id"),
          }),
        },
      },
    };
  }
}

module.exports = UserRoutes;
