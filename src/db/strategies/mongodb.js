const ICrud = require("../strategies/interfaces/interfaceCrud");
const Mongoose = require("mongoose");

const STATUS = {
  0: "Disconnected",
  1: "Connected",
  2: "Connecting",
  3: "Disconnecting",
};

class MongoDB extends ICrud {
  constructor() {
    super();
    this._question = null;
    this._driver = null;
  }

  async isConnected() {
    return STATUS[this._driver.readyState];
  }

  defineModel() {
    const questionSchema = new Mongoose.Schema({
      status: { type: String, required: "Enter the question status" },
      description: { type: String, required: "Enter the question status" },
      options: String,
      creationDate: { type: Date, default: Date.now },
      modifiedDate: { type: Date, default: Date.now },
    });

    //mocha workaround
    this._question =
      Mongoose.models.question || Mongoose.model("question", questionSchema);
  }
  async connect() {
    Mongoose.connect(
      "mongodb+srv://user:password1234@qacluster.t1ys3.mongodb.net/QAdb?retryWrites=true&w=majority",
      { useNewUrlParser: true },
      function (error) {
        if (!error) return;
        console.log("connection fail", error);
      }
    );

    this._driver = Mongoose.connection;
    this._driver.once("open", () => console.log("database is up"));
    this.defineModel();
  }

  async create(item) {
    return this._question.create(item);
  }

  async read(item = {}) {
    return this._question.find(item, { description: 1 });
  }

  async update(id, item) {
    return this._question.updateOne({ _id: id }, { $set: item });
  }

  async delete(id) {
    return this._question.deleteOne({ _id: id });
  }
}

module.exports = MongoDB;
