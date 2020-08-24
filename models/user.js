const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  Email: {
    type: String,
  },
  Password: {
    type: String,
  },
  Name: {
    type: String,
  },
  Designation: {
    type: String,
  },
});
module.exports = U = mongoose.model("User", User);
