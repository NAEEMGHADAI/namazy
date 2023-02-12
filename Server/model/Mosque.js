const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NamazSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  mosqueName: {
    type: String,
    required: true,
  },
  fajr: String,
  zuhr: String,
  asr: String,
  magrib: String,
  isha: String,
  juma: String,
  lastModified: Date,
});

module.exports = mongoose.model("NamazTime", NamazSchema);
