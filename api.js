const Hapi = require("@hapi/hapi");
const HapiSwagger = require("hapi-swagger");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const JWT_SECRET = "MY_BIG_SECRET_123";
const HapiJwt = require("hapi-auth-jwt2");

const pckjson = require("./package.json");

const Context = require("./src/db/strategies/base/contextStrategy");
const MongoDb = require("./src/db/strategies/mongodb/mongoDbStrategy");
const QuestionRoute = require("./src/routes/questionRoutes");
const AnswerRoutes = require("./src/routes/answerRoutes");
const UserRoutes = require("./src/routes/userRoutes");
const AuthRoutes = require("./src/routes/authRoutes");
const QuestionSchema = require("./src/db/strategies/mongodb/schemas/questionSchema");
const AnswerSchema = require("./src/db/strategies/mongodb/schemas/answerSchema");
const UserSchema = require("./src/db/strategies/mongodb/schemas/userSchema");

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
  const questionsContext = new Context(new MongoDb(connection, QuestionSchema));
  const answersContext = new Context(new MongoDb(connection, AnswerSchema));
  const usersContext = new Context(new MongoDb(connection, UserSchema));

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
    key: JWT_SECRET,
    validate: (data, request) => {
      return {
        isValid: true,
      };
    },
  });
  app.auth.default("jwt");

  app.route([
    ...mapRoutes(new QuestionRoute(questionsContext), QuestionRoute.methods()),
    ...mapRoutes(new AnswerRoutes(answersContext), AnswerRoutes.methods()),
    ...mapRoutes(new UserRoutes(usersContext), UserRoutes.methods()),
    ...mapRoutes(new AuthRoutes(null, JWT_SECRET), AuthRoutes.methods()),
  ]);

  await app.start();
  console.log(`server running at port: ${app.info.port}`);

  return app;
}

module.exports = main();
