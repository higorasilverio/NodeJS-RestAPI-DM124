const Hapi = require("hapi");
const Context = require("./src/db/strategies/base/contextStrategy");
const MongoDb = require("./src/db/strategies/mongodb/mongoDbStrategy");
const QuestionSchema = require("./src/db/strategies/mongodb/schemas/questionSchema");
const QuestionRoute = require("./src/routes/questionRoutes");
const AnswerSchema = require("./src/db/strategies/mongodb/schemas/answerSchema");
const UserSchema = require("./src/db/strategies/mongodb/schemas/questionSchema");

const app = new Hapi.Server({
  port: 5000,
});

function mapRoutes(instance, methods) {
  return methods.map((method) => instance[method]());
}

async function main() {
  const connection = MongoDb.connect();
  const context = new Context(new MongoDb(connection, QuestionSchema));

  app.route([
    ...mapRoutes(new QuestionRoute(context), QuestionRoute.methods()),
  ]);

  await app.start();
  console.log(`server running at port: ${app.info.port}`);

  return app;
}

module.exports = main();
