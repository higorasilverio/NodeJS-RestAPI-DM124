const Mongoose = require("mongoose");

const questionSchema = new Mongoose.Schema({
  status: { type: String, required: "Enter the question status" },
  description: { type: String, required: "Enter the question description" },
  options: String,
  creationDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },
});

module.exports =
  Mongoose.models.question || Mongoose.model("question", questionSchema);
