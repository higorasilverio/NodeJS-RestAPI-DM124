import mongoose from "mongoose";
import { QuestionSchema } from "../models/questionModel";
import { AnswerSchema } from "../models/answerModel";
import { UserSchema } from "../models/userModel";

const Question = mongoose.model("Question", QuestionSchema);
const Answer = mongoose.model("Answer", AnswerSchema);
const User = mongoose.model("User", UserSchema);

export const addNewQuestion = async (req, res) => {
  let newQuestion = new Question(req.body);
  await newQuestion.save((err, question) => {
    if (err) {
      res.send(err);
    }
    res.json(question);
  });
};

export const addNewAnswer = async (req, res) => {
  let newAnswer = new Answer(req.body);
  await newAnswer.save((err, answer) => {
    if (err) {
      res.send(err);
    }
    res.json(answer);
  });
};

export const registerUser = async (req, res) => {
  let newUser = new User(req.body);
  await newUser.save((err, user) => {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
};
