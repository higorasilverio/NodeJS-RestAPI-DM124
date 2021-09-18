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
          const { skip, limit, description } = request.query;
          let query = description
            ? { description: { $regex: `.*${description}` } }
            : {};
          return this.db.read(query, skip, limit);
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
          console.log("Entered");
          const { status, description, options } = request.payload;
          console.log("request.payload", status, description, options);
          const result = await this.db.create({ status, description, options });
          console.log("result", result);
          return result;
        } catch (error) {
          console.log({ error });
          return "Internal server error";
        }
      },
    };
  }
}
module.exports = HeroRoutes;
