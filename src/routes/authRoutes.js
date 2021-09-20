const BaseRoute = require("./base/baseRoute");
const Joi = require("joi");
const Boom = require("boom");
const Jwt = require("jsonwebtoken");

const { UserSchema } = require("../utils/joiObjectUtils");

const userToCheck = "user";
const passwordToCheck = "123";

class AuthRoutes extends BaseRoute {
  constructor(db, secret) {
    super();
    this.db = db;
    this.secret = secret;
  }

  login() {
    return {
      path: "/api/login",
      method: "POST",
      options: {
        handler: async (request, headers) => {
          try {
            const { user, password } = request.payload;
            if (user !== userToCheck && password !== passwordToCheck) {
              return Boom.unauthorized();
            }
            const token = Jwt.sign(
              {
                username: user,
                id: 1,
              },
              this.secret
            );
            return token;
          } catch (error) {
            console.log({ error });
            return Boom.internal();
          }
        },
        description: "Login into Q&A application",
        notes: "Returns an authentication token",
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
        auth: false,
        tags: ["api", "authentication"],
        validate: {
          payload: Joi.object({
            user: Joi.string().required().description("User's login"),
            password: Joi.string().required().description("User's password"),
          }),
        },
      },
    };
  }
}

module.exports = AuthRoutes;
