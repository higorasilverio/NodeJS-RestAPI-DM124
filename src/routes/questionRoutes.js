const BaseRoute = require("./base/baseRoute");
const Boom = require("boom");

class QuestionRoutes extends BaseRoute {
  constructor(db) {
    super();
    this.db = db;
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
          let data = JSON.parse(stringData);
          data = { ...data, modifiedDate: Date.now() };
          const result = await this.db.update(id, data);
          return result.n === 1
            ? { _id: id, message: "question updated successfully" }
            : { _id: id, message: "question couldn't be updated" };
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
          const result = await this.db.delete(id);
          return result.n === 1
            ? { _id: id, message: "question deleted successfully" }
            : { _id: id, message: "question couldn't be deleted" };
        } catch (error) {
          console.log({ error });
          return Boom.internal();
        }
      },
    };
  }
}

module.exports = QuestionRoutes;
