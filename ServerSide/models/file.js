const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const File = new Schema({
  CompanyName: {
    type: String
  },
  Date: {
    type: Date
  },
  OptionalDetails: {
    type: String
  },
  NegligibleRates: {
    type: String
  },
  FileName: {
    type: String
  },
  FileID: {
    type: String
  }
});
module.exports = User = mongoose.model("File", File);
