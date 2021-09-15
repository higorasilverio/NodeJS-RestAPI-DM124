import mongoose from "mongoose";
import { QuestionSchema } from "../models/questionModel";
import { AnswerSchema } from "../models/answerModel";
import { UserSchema } from "../models/userModel";

const Question = mongoose.model("Question", QuestionSchema);
const Answer = mongoose.model("Answer", AnswerSchema);
const User = mongoose.model("User", UserSchema);

export const addNewQuestion = async (req, res) => {
  let newQuestion = new Question(req.body);
  console.log(newQuestion);
  await newQuestion.save((err, question) => {
    if (err) {
      res.send(err);
    }
    res.json(question);
  });
};
