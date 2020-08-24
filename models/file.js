const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const File = new Schema({
  UserID: {
    type: String,
  },
  CompanyName: {
    type: String,
  },
  Date: {
    type: Date,
  },
  OptionalDetails: {
    type: String,
  },
  NegligibleRates: {
    type: Number,
  },
  DepreciationRates: {
    type: Number,
  },
  FileName: {
    type: String,
  },
  FileID: {
    type: String,
  },
  AssetName: {
    type: [String],
  },
  Value: {
    type: [Number],
  },
  Depreciation: {
    type: [Number],
  },
  NetValue: {
    type: [Number],
  },
  AssetsFSM: {
    type: { String },
  },
});
module.exports = User = mongoose.model("File", File);
