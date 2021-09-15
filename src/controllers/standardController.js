import mongoose from "mongoose";
import { QuestionSchema } from "../models/questionModel";
import { AnswerSchema } from "../models/answerModel";
import { UserSchema } from "../models/userModel";

const Question = mongoose.model("Question", QuestionSchema);
const Answer = mongoose.model("Answer", AnswerSchema);
const User = mongoose.model("User", UserSchema);

export const addNewQuestion = (req, res) => {
  let newQuestion = new Question(req.body);
  newQuestion.save((err, question) => {
    if (err) {
      res.send(err);
    }
    res.json(question);
  });
};

export const getQuestions = (req, res) => {
  Question.find({}, (err, question) => {
    if (err) {
      res.send(err);
    }
    res.json(question);
  });
};

export const getQuestionWithId = (req, res) => {
  Question.findById(req.params.questionId, (err, question) => {
    if (err) {
      res.send(err);
    }
    res.json(question);
  });
};

export const updateQuestion = (req, res) => {
  const body = { ...req.body, modifiedDate: Date.now().toString() };
  Question.findOneAndUpdate(
    { _id: req.params.questionId },
    body,
    { new: true, useFindAndModify: false },
    (err, question) => {
      if (err) {
        res.send(err);
      }
      res.json(question);
    }
  );
};

export const addNewAnswer = (req, res) => {
  let newAnswer = new Answer(req.body);
  newAnswer.save((err, answer) => {
    if (err) {
      res.send(err);
    }
    res.json(answer);
  });
};

export const getAnswers = (req, res) => {
  Answer.find({}, (err, answer) => {
    if (err) {
      res.send(err);
    }
    res.json(answer);
  });
};

export const getAnswerWithId = (req, res) => {
  Answer.findById(req.params.answerId, (err, answer) => {
    if (err) {
      res.send(err);
    }
    res.json(answer);
  });
};

export const updateAnswer = (req, res) => {
  const body = { ...req.body, modifiedDate: Date.now().toString() };
  Answer.findOneAndUpdate(
    { _id: req.params.answerId },
    body,
    { new: true, useFindAndModify: false },
    (err, answer) => {
      if (err) {
        res.send(err);
      }
      res.json(answer);
    }
  );
};

export const registerUser = (req, res) => {
  let newUser = new User(req.body);
  newUser.save((err, user) => {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
};

export const getUserWithId = (req, res) => {
  User.findById(req.params.userId, (err, user) => {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
};

export const updateUserRole = (req, res) => {
  if (!req.body.role) {
    res.status(400).send("Role description is madatory!");
  }
  const body = { role: req.body.role, modifiedDate: Date.now().toString() };
  User.findOneAndUpdate(
    { _id: req.params.userId },
    body,
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    }
  );
};
