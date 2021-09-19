const BaseRoute = require("./base/baseRoute");
const Boom = require("boom");

class QuestionRoutes extends BaseRoute {
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
          return Boom.internal();
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
          return Boom.internal();
        }
      },
    };
  }

  getOne() {
    return {
      path: "/api/questions/{id}",
      method: "GET",
      handler: async (request, headers) => {
        try {
          const { id } = request.params;
          const result = await this.db.find(id);
          return result ? result : {};
        } catch (error) {
          console.log({ error });
          return Boom.internal();
        }
      },
    };
  }

  update() {
    return {
      path: "/api/questions/{id}",
      method: "PATCH",
      handler: async (request, headers) => {
        try {
          const { id } = request.params;
          const { payload } = request;
          const stringData = JSON.stringify(payload);
          const data = JSON.parse(stringData);
          return await this.db.update(id, data);
        } catch (error) {
          console.log({ error });
          return Boom.internal();
        }
      },
    };
  }

  delete(id) {
    return {
      path: "/api/questions/{id}",
      method: "DELETE",
      handler: async (request, headers) => {
        try {
          const { id } = request.params;
          return await this.db.delete(id);
        } catch (error) {
          console.log({ error });
          return Boom.internal();
        }
      },
    };
  }
}

module.exports = QuestionRoutes;
