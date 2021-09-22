require("dotenv").config();

const Mongoose = require("mongoose");

const ICrud = require("../base/interfaceDb");

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
      process.env.DB_HOST,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      function (error) {
        if (!error) return;
        console.log("Connection fail", error);
      }
    );
    const connection = Mongoose.connection;
    connection.once("open", () => console.log("Database is up"));
    return connection;
  }

  async create(item) {
    return this._collection.create(item);
  }

  async read() {
    return this._collection.find();
  }

  async find(id) {
    return Mongoose.Types.ObjectId.isValid(id)
      ? this._collection.findById(id)
      : null;
  }

  async update(id, item) {
    return this._collection.updateOne({ _id: id }, { $set: item });
  }

  async delete(id) {
    return this._collection.deleteOne({ _id: id });
  }
}

module.exports = MongoDB;
