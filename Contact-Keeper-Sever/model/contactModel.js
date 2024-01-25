const mongoose = require("mongoose");
const schema = mongoose.Schema;
const admin = require("../model/userModel");
const bcrypt = require('bcryptjs')

const contactSchema = new schema(
  {
    user: {
      type: mongoose.Schema.Types.String,
      ref: admin,
      required: true,
    },

    driverName: {
      type: String,
      default: "Test name",
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      required: true,
      type: String,
    },
    travelMode: {
      type: String,
      enum: ["TAXI", "BIKE"],
      default: "TAXI",
    },
    vehicleBrand: {
      type: String,
      default: "Hyundai",
    },
    role: {
      type: String,
      default: "driver",
    },
    driverAvatar: {
      type: String,
      default: null,
    },
    licensePlate: {
      type: String,
      default: "29V5-19850",
    },
    activeStatus: {
      type: Boolean,
      default: false,
    },
    currentAddress: {
      type: Number,
    },
    currentLongitude: {
      type: Number,
    },
    currentLatitude: {
      type: Number,
    },
    socketId: {
      type: String,
    },
    ratings: [
      {
        star: { type: Number },
        postedBy: { type: mongoose.Types.ObjectId, ref: "User" },
        comment: { type: String },
      },
    ],
    totalRating: {
      type: Number,
      default: 0,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

contactSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    console.log("a");
    const salt = await bcrypt.genSaltSync(10);
    console.log("b");
    this.password = await bcrypt.hash(this.password, salt);
    console.log("c");
    next();
  } catch (error) {
    return next(error);
  }
});

module.exports = mongoose.model("Driver", contactSchema);
