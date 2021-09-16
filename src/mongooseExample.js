const Mongoose = require("mongoose");

Mongoose.connect(
  "mongodb+srv://user:password1234@qacluster.t1ys3.mongodb.net/QAdb?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  function (error) {
    if (!error) return;
    console.log("Connection fail!", error);
  }
);

const connection = Mongoose.connection;

connection.once("open", () => console.log("database is running"));

const questionSchema = new Mongoose.Schema({
  status: { type: String, required: "Enter the question status" },
  description: { type: String, required: "Enter the question status" },
  options: String,
  creationDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },
});
const questionModel = Mongoose.model("Question", questionSchema);

const answerSchema = new Mongoose.Schema({
  key: { type: String, required: "Enter the answer key" },
  name: { type: String, required: "Enter your name" },
  answer: { type: String, required: "Enter the answer" },
  questionId: [{ type: Mongoose.Schema.Types.ObjectId, ref: "Question" }],
  creationDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },
});
const answerModel = Mongoose.model("Answer", answerSchema);

async function main() {
  const newQuestion = await questionModel.create({
    status: "statusOK",
    description: "descriptionOK",
    options: "optionsOK",
  });
  console.log("Result from create question: ", newQuestion);
  const newAnswer = await answerModel.create({
    key: "keyOK",
    name: "nameOK",
    answer: "answerOK",
    questionId: "6143ba8fb6b484f259af2d06",
  });
  console.log("Result from create answer: ", newAnswer);
}

main();
