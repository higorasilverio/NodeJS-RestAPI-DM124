const ICrud = require("../base/interfaceDb");
const Mongoose = require("mongoose");
const STATUS = {
  0: "Disconnected",
  1: "Connected",
  2: "Connecting",
  3: "Disconnecting",
};
class MongoDB extends ICrud {
  constructor(connection, schema) {
    super();
    this._connection = connection;
    this._collection = schema;
  }

  async isConnected() {
    const state = STATUS[this._connection.readyState];
    if (state === "Connected") return state;
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return STATUS[this._connection.readyState];
  }

  static connect() {
    Mongoose.connect(
      "mongodb+srv://user:password1234@qacluster.t1ys3.mongodb.net/QAdb?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      function (error) {
        if (!error) return;
        console.log("Falha na conexão!", error);
      }
    );
    const connection = Mongoose.connection;
    connection.once("open", () => console.log("database is up"));
    return connection;
  }

  async create(item) {
    return this._collection.create(item);
  }

  async read(item, skip = 0, limit = 10) {
    return this._collection.find(item).skip(skip).limit(limit);
  }

  async update(id, item) {
    return this._collection.updateOne({ _id: id }, { $set: item });
  }

  async delete(id) {
    return this._collection.deleteOne({ _id: id });
  }
}

module.exports = MongoDB;
