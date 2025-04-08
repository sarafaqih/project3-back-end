const mongoose = require("mongoose");

const reservationSchema = mongoose.Schema({
  reservedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  stadium: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stadium",
    required: true,
  },
  reserveFrom:{
    type:Number,
    required:true,
  },
  reserveTo:{
    type:Number,
    required:true,
  },
  totallPrice:{
    type:Number,
    required:true
  }
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
