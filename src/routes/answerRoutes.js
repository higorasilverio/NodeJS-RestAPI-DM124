const BaseRoute = require("./base/baseRoute");
const Boom = require("boom");

class AnswerRoutes extends BaseRoute {
  constructor(db) {
    super();
    this.db = db;
  }

  create() {
    return {
      path: "/api/answers",
      method: "POST",
      handler: async (request, headers) => {
        try {
          const { key, name, answer, questionId } = request.payload;
          return await this.db.create({ key, name, answer, questionId });
        } catch (error) {
          console.log({ error });
          return Boom.internal();
        }
      },
    };
  }

  list() {
    return {
      path: "/api/answers",
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
      path: "/api/answers/{id}",
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
      path: "/api/answers/{id}",
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
            ? { _id: id, message: "answer updated successfully" }
            : { _id: id, message: "answer couldn't be updated" };
        } catch (error) {
          console.log({ error });
          return Boom.internal();
        }
      },
    };
  }

  delete(id) {
    return {
      path: "/api/answers/{id}",
      method: "DELETE",
      handler: async (request, headers) => {
        try {
          const { id } = request.params;
          const result = await this.db.delete(id);
          return result.n === 1
            ? { _id: id, message: "answer deleted successfully" }
            : { _id: id, message: "answer couldn't be deleted" };
        } catch (error) {
          console.log({ error });
          return Boom.internal();
        }
      },
    };
  }
}

module.exports = AnswerRoutes;
