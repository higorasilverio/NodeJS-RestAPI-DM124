require("dotenv").config();
const Hapi = require("@hapi/hapi");
const HapiSwagger = require("hapi-swagger");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const HapiJwt = require("hapi-auth-jwt2");

const pckjson = require("./package.json");

const Context = require("./src/db/strategies/base/contextStrategy");
const MongoDb = require("./src/db/strategies/mongodb/mongoDbStrategy");
const AuthRoutes = require("./src/routes/authRoutes");
const UserRoutes = require("./src/routes/userRoutes");
const QuestionRoute = require("./src/routes/questionRoutes");
const AnswerRoutes = require("./src/routes/answerRoutes");
const UserSchema = require("./src/db/strategies/mongodb/schemas/userSchema");
const QuestionSchema = require("./src/db/strategies/mongodb/schemas/questionSchema");
const AnswerSchema = require("./src/db/strategies/mongodb/schemas/answerSchema");

const app = new Hapi.Server({
  port: 5000,
});

const swaggerOptions = {
  info: {
    title: "Q&A API Documentation",
    version: pckjson.version,
    description: "Questions & Answers API",
    contact: {
      name: "Higor Silvério",
      email: "higoasilverio@outlook.com",
    },
  },
};

function mapRoutes(instance, methods) {
  return methods.map((method) => instance[method]());
}

async function main() {
  const connection = MongoDb.connect();
  const authContext = new Context(new MongoDb(connection, UserSchema));
  const usersContext = new Context(new MongoDb(connection, UserSchema));
  const questionsContext = new Context(new MongoDb(connection, QuestionSchema));
  const answersContext = new Context(new MongoDb(connection, AnswerSchema));

  await app.register([
    HapiJwt,
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  app.auth.strategy("jwt", "jwt", {
    key: process.env.JWT_SECRET,
    validate: (data, request) => {
      return {
        isValid: true,
      };
    },
  });
  app.auth.default("jwt");

  app.route([
    ...mapRoutes(
      new AuthRoutes(authContext, process.env.JWT_SECRET),
      AuthRoutes.methods()
    ),
    ...mapRoutes(new UserRoutes(usersContext), UserRoutes.methods()),
    ...mapRoutes(new QuestionRoute(questionsContext), QuestionRoute.methods()),
    ...mapRoutes(new AnswerRoutes(answersContext), AnswerRoutes.methods()),
  ]);

  await app.start();
  console.log(
    `Server running at port: ${app.info.port}. Wait for the database to connect...`
  );

  return app;
}

module.exports = main();
