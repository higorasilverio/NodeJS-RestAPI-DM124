import mongoose from "mongoose";
import { QuestionSchema, AnswerSchema, UserSchema } from "../models/model";

const Question = mongoose.model("Question", QuestionSchema);
const Answer = mongoose.model("Answer", AnswerSchema);
const User = mongoose.model("User", UserSchema);

export const addNewQuestion = async (req, res) => {
  let newQuestion = new Question(req.body);
  console.log(newQuestion);
  await newQuestion.save((err, question) => {
    console.log(err, question);
    if (err) {
      res.send(err);
    }
    console.log(question);
    res.json(question);
  });
};
