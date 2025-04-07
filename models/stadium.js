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
    type: number,
    required: true,
  },
  closingTime: {
    type: number,
    required: true,
  },
  Facilities: {
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
    enum: [outdoor, indoor],
    required: true,
  },
  playerGender: {
    type: String,
    enum: [female, male, mixed],
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
});

const Stadium = mongoose.model("Stadium", stadiumSchema);

module.exports = Stadium;
