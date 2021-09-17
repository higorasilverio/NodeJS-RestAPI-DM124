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
      handler: (request, headers) => {
        return this.db.create();
      },
    };
  }
}
module.exports = HeroRoutes;
