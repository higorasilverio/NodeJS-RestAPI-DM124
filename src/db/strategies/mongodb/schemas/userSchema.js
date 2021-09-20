const Mongoose = require("mongoose");

const userSchema = new Mongoose.Schema({
  name: { type: String, required: "Enter the user's name" },
  password: { type: String, required: "Enter the user's password" },
  role: { type: String, default: "user" },
  creationDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },
});

module.exports = Mongoose.models.user || Mongoose.model("user", userSchema);
