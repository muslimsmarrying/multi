const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    type: {
      type: String,
      enum: ["Deposit", "Transfer"],
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    chainId: {
      type: String,
      required: true,
    },
    tokenId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    fromAddress: { type: String, required: true },
    toAddress: { type: String },
    txid: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
    notes: { type: String },
    fee: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transactions", transactionSchema);
