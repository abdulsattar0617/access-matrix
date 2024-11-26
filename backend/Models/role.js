const mongoose = require("mongoose");

const { Schema } = mongoose;

const roleSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please send the role title!"],
  },
  permissions: {
    type: Schema.Types.Mixed,
    default: {
      read: false,
      write: false,
    },
    required: [true, "Please assign the permissions!"],
    // type: Schema.Types.Mixed
  },
  otherPermissions: {
    type: [],
  },
});

const RoleModel = mongoose.model("Role", roleSchema);

module.exports = RoleModel;
