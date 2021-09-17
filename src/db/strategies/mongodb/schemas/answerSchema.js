const Mongoose = require("mongoose");

const answerSchema = new Mongoose.Schema({
  key: { type: String, required: "Enter the answer key" },
  name: { type: String, required: "Enter your name" },
  answer: { type: String, required: "Enter the answer" },
  questionId: [{ type: Schema.Types.ObjectId, ref: "question" }],
  creationDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },
});

//mocha workaround
module.exports =
  Mongoose.models.answer || Mongoose.model("answer", answerSchema);
