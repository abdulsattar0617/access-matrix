const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please send the name of the user!"],
  },
  email: {
    type: String,
    required: [true, "Please send the user email address!"],
  },
  username: {
    type: String,
    required: [true, "Please send the username!"],
  },
  password: {
    type: String,
    required: [true, "Please set user password!"],
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: [true, "Please send the user role ID!"],
  },
  isActive: {
    type: Boolean,
    required: [true, "Mark user as active or inactive!"],
  },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
