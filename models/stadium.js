const mongoose = require("mongoose");

const stadiumSchema = mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  Governorates: {
    type: String,
    enum: ["capital", "muharraq", "northern", "southern"],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  openingTime: {
    type: String,
    required: true,
  },
  closingTime: {
    type: String,
    required: true,
  },
  Facilities: {
    type: [String],
    enum: [
      "prayer room",
      "toilets",
      "shower",
      "locker area",
      "coffee shop",
      "free ball",
      "water",
    ],
  },
  GoogleMaps: {
    type: String,
  },
  ContactNo: {
    type: Number,
    required: true,
  },
  PricePerHour: {
    type: Number,
    required: true,
  },
  StadiumNature: {
    type: String,
    enum: ["outdoor", "indoor"],
    required: true,
  },
  playerGender: {
    type: String,
    enum: ["female", "male", "both"],
    required: true,
  },
  notes: {
    type: String,
  },
  addedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  addedBy:{
    type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
  }
});

const Stadium = mongoose.model("Stadium", stadiumSchema);

module.exports = Stadium;
