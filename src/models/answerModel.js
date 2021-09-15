import mongoose from "mongoose";

const { Schema } = mongoose;

export const AnswerSchema = new Schema({
  key: { type: String, required: "Enter the answer key" },
  name: { type: String, required: "Enter your name" },
  answer: { type: String, required: "Enter the answer" },
  questionId: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  creationDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },
});
