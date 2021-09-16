const assert = require("assert");
const MongoDb = require("./src/db/strategies/mongodb");
const Context = require("./src/db/strategies/base/contextStrategy");

const context = new Context(new MongoDb());

describe("MongoDB test suite", function () {
  this.beforeAll(async () => {
    await context.connect();
  });
  it("Check connection", async () => {
    const result = await context.isConnected();
    console.log("result", result);
    assert.deepEqual(result, "Conectado");
  });
});
