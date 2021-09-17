const Hapi = require("hapi");
const Context = require("./src/db/strategies/base/contextStrategy");
const MongoDb = require("./src/db/strategies/mongodb/mongoDbStrategy");
const QuestionSchema = require("./src/db/strategies/mongodb/schemas/questionSchema");
const AnswerSchema = require("./src/db/strategies/mongodb/schemas/answerSchema");
const UserSchema = require("./src/db/strategies/mongodb/schemas/questionSchema");

const app = new Hapi.Server({
  port: 5000,
});

async function main() {
  const connection = MongoDb.connect();
  const context = new Context(new MongoDb(connection, QuestionSchema));
  app.route([
    {
      path: "/api/questions",
      method: "GET",
      handler: (request, head) => {
        return context.read();
      },
    },
  ]);
  await app.start();
  console.log(`server running at port: ${app.info.port}`);
}

main();
