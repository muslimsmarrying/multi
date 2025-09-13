const mongoose = require("mongoose");

const adminActivitySchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    activity: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    ipAddress: {
      type: String,
    },
    location: {
      type: String,
    },
    userAgent: {
      type: String,
    },
    deviceInfo: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

module.exports = mongoose.model("AdminActivity", adminActivitySchema);
