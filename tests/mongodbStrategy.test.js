const assert = require("assert");
const MongoDb = require("./../src/db/strategies/mongodb/mongoDbStrategy");
const QuestionSchema = require("./../src/db/strategies/mongodb/schemas/questionSchema");
const Context = require("./../src/db/strategies/base/contextStrategy");

let context = {};

describe("MongoDB test suit", function () {
  this.beforeAll(async () => {
    const connection = MongoDb.connect();
    context = new Context(new MongoDb(connection, QuestionSchema));
  });
  it("Check connection", async () => {
    const result = await context.isConnected();
    const expected = "Connected";

    assert.deepEqual(result, expected);
  });
});
