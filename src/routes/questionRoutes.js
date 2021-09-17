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
        return this.db.read();
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
