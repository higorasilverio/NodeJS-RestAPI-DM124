const BaseRoute = require("./base/baseRoute");
const Boom = require("boom");

class UserRoutes extends BaseRoute {
  constructor(db) {
    super();
    this.db = db;
  }

  create() {
    return {
      path: "/api/users",
      method: "POST",
      handler: async (request, headers) => {
        try {
          let { name, role } = request.payload;
          role = role === "admin" ? "admin" : "user";
          return await this.db.create({ name, role });
        } catch (error) {
          console.log({ error });
          return Boom.internal();
        }
      },
    };
  }

  getOne() {
    return {
      path: "/api/users/{id}",
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
      path: "/api/users/{id}",
      method: "PATCH",
      handler: async (request, headers) => {
        try {
          const { id } = request.params;
          const { payload } = request;
          const stringData = JSON.stringify(payload);
          let data = JSON.parse(stringData);
          const result = data.role
            ? await this.db.update(id, {
                role: data.role === "admin" ? "admin" : "user",
                modifiedDate: Date.now(),
              })
            : Boom.preconditionFailed("Role parameter is missing");
          return result.n === 1
            ? { _id: id, message: "user's role updated successfully" }
            : { _id: id, message: "user's role couldn't be updated" };
        } catch (error) {
          console.log({ error });
          return Boom.internal();
        }
      },
    };
  }

  delete(id) {
    return {
      path: "/api/users/{id}",
      method: "DELETE",
      handler: async (request, headers) => {
        try {
          const { id } = request.params;
          const result = await this.db.delete(id);
          return result.n === 1
            ? { _id: id, message: "user deleted successfully" }
            : { _id: id, message: "user couldn't be deleted" };
        } catch (error) {
          console.log({ error });
          return Boom.internal();
        }
      },
    };
  }
}

module.exports = UserRoutes;
