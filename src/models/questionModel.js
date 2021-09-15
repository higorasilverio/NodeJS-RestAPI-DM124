import mongoose from "mongoose";

const { Schema } = mongoose;

export const QuestionSchema = new Schema({
  status: { type: String, required: "Enter the question status" },
  description: { type: String, required: "Enter the question status" },
  options: String,
  creationDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },
});
