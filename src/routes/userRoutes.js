const BaseRoute = require("./base/baseRoute");
const Joi = require("joi");
const Boom = require("boom");

const PasswordHelper = require("./../helpers/passwordHelper");
const invalidRole = require("./../utils/checkRoleUtils");

const {
  UserSchema,
  Message,
  PathParam,
  Headers,
} = require("../utils/joiObjectUtils");

const UpdateHelper = require("../helpers/updateHelper");

class UserRoutes extends BaseRoute {
  constructor(db) {
    super();
    this.db = db;
  }

  create() {
    return {
      path: "/users",
      method: "POST",
      options: {
        handler: async (request, headers) => {
          if (invalidRole(headers))
            return Boom.forbidden(
              "User's creation allowed to admin users only"
            );
          try {
            let { name, password, role } = request.payload;
            const users = await this.db.read();
            const existentUser = users.find(
              (usr) => usr.name === name && usr.role === role
            );
            if (existentUser) {
              return Boom.conflict("User already exists", { name, role });
            }
            role = role === "admin" ? "admin" : "user";
            password = await PasswordHelper.hashPassword(password);
            return await this.db.create({ name, password, role });
          } catch (error) {
            console.log({ error });
            return Boom.internal();
          }
        },
        description: "Create user",
        notes:
          "Returns the user created using payload parameters name, password, and role",
        plugins: {
          "hapi-swagger": {
            responses: {
              200: {
                description: "Success",
                schema: UserSchema,
              },
            },
            payloadType: "form",
          },
        },
        tags: ["api", "users"],
        validate: {
          payload: Joi.object({
            name: Joi.string().required().description("User's name"),
            password: Joi.string().required().description("User's password"),
            role: Joi.string().default("user").description("User's role"),
          }),
          headers: Headers,
        },
      },
    };
  }

  getOne() {
    return {
      path: "/users/{id}",
      method: "GET",
      options: {
        handler: async (request, headers) => {
          if (invalidRole(headers))
            return Boom.forbidden(
              "Retrieve user's information allowed to admin users only"
            );
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
                schema: UserSchema,
              },
            },
            payloadType: "form",
          },
        },
        tags: ["api", "users"],
        validate: {
          params: PathParam,
          headers: Headers,
        },
      },
    };
  }

  update() {
    return {
      path: "/users/{id}",
      method: "PATCH",
      options: {
        handler: async (request, headers) => {
          if (invalidRole(headers))
            return Boom.forbidden(
              "User's role update allowed to admin users only"
            );
          try {
            const { id } = request.params;
            const { payload } = request;
            const previousPayload = await this.db.find(id);
            const data = UpdateHelper.provideCorrectPayload(
              "user",
              payload,
              previousPayload
            );
            const result = await this.db.update(id, data);
            return result.n === 1
              ? {
                  _id: id,
                  message: `user's role updated successfully to ${data.role}`,
                }
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
                schema: Message,
              },
            },
            payloadType: "form",
          },
        },
        tags: ["api", "users"],
        validate: {
          payload: Joi.object({
            role: Joi.string().default("user").description("User's role"),
          }),
          params: PathParam,
          headers: Headers,
        },
      },
    };
  }

  delete(id) {
    return {
      path: "/users/{id}",
      method: "DELETE",
      options: {
        handler: async (request, headers) => {
          if (invalidRole(headers))
            return Boom.forbidden("User's delete allowed to admin users only");
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
                schema: Message,
              },
            },
            payloadType: "form",
          },
        },
        tags: ["api", "users"],
        validate: {
          params: PathParam,
          headers: Headers,
        },
      },
    };
  }
}

module.exports = UserRoutes;
