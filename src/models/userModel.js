import mongoose from "mongoose";

const { Schema } = mongoose;

export const UserSchema = new Schema({
  name: { type: String, required: "Enter the user's name" },
  role: { type: String, required: "Enter the user's role" },
  creationDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },
});
