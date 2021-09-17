const ContextStrategy = require("./db/strategies/base/contextStrategy");
const MongoDB = require("./db/strategies/mongodb");

const contextMongo = new ContextStrategy(new MongoDB());

contextMongo.create();
