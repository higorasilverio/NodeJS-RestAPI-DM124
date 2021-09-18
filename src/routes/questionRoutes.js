const questionSchema = require("../db/strategies/mongodb/schemas/questionSchema");
const BaseRoute = require("./base/baseRoute");

class HeroRoutes extends BaseRoute {
  constructor(db) {
    super();
    this.db = db;
  }

  list() {
    return {
      path: "/api/questions",
      method: "GET",
      handler: (request, headers) => {
        try {
          return this.db.read();
        } catch (error) {
          console.log({ error });
          return "Internal server error";
        }
      },
    };
  }

  create() {
    return {
      path: "/api/questions",
      method: "POST",
      handler: async (request, headers) => {
        try {
          const { status, description, options } = request.payload;
          return await this.db.create({ status, description, options });
        } catch (error) {
          console.log({ error });
          return "Internal server error";
        }
      },
    };
  }
}
module.exports = HeroRoutes;
