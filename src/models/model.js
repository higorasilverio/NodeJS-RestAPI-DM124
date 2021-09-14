import mongoose from "mongoose";

const { Schema } = mongoose;

export const QuestionSchema = new Schema({
  status: { type: String, required: "Enter the question status" },
  description: { type: String, required: "Enter the question status" },
  options: String,
  creationDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },
});

export const AnswerSchema = new Schema({
  key: { type: String, required: "Enter the answer key" },
  name: { type: String, required: "Enter your name" },
  answer: { type: String, required: "Enter the answer" },
  questionId: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  creationDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },
});

export const UserSchema = new Schema({
  name: { type: String, required: "Enter the user's name" },
  role: { type: String, required: "Enter the user's role" },
  creationDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },
});
