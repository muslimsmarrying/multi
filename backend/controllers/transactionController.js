const TransactionModel = require("../models/TransactionModel");
const UserModel = require("../models/UserModel");
const createTransporter = require("../config/emailConfig");
const adminModel = require("../models/adminModel");

const getAllTransactionsController = async (req, res) => {
  try {
    // Fetch all transactions
    const transactions = await TransactionModel.find({});
    if (!transactions || transactions.length === 0) {
      return res
        .status(400)
        .send({ success: false, message: "No transactions found" });
    }
    return res.status(200).send({
      success: true,
      transactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching transactions with entries",
      error,
    });
  }
};

const getAllTransactionWithWalletController = async (req, res) => {
  const { id } = req.user;
  if (!id) {
    return res.status(204).json({ success: false, message: "No User Exists" });
  }
  try {
    // Fetch all transactions
    const transactions = await TransactionModel.find({ user: id }, null, {
      sort: { createdAt: -1 },
    });

    return res.status(200).json({
      success: true,
      transactions: transactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in fetching transactions with wallet entries",
      error: error.message,
    });
  }
};

const getAllUserTransactionsController = async (req, res) => {
  try {
    // Fetch all transactions
    const { id } = req.params;
    if (!id) {
      return res
        .status(204)
        .json({ success: false, message: "No User Exists" });
    }
    const transactions = await TransactionModel.find({ userID: id })
      .populate({
        path: "fundEnrollment",
        select: "fund class balance depositBalance",
        populate: [
          {
            path: "fund",
            model: "Fund",
            select: "name",
          },
          {
            path: "class",
            model: "Class",
            select: "class",
          },
        ],
      })
      .lean();
    if (!transactions || transactions.length === 0) {
      return res
        .status(204)
        .json({ success: false, message: "No transactions found" });
    }
    return res.status(200).send({
      success: true,
      transactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching transactions",
      error,
    });
  }
};

const sendTransactionEmail = async (email, name, mainTransaction, time) => {
  // Configure the email transport using nodemailer
  const transporter = createTransporter();
  const formattedTime = new Date(time).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  // Email options
  const mailOptions = {
    from: process.env.AUTH_EMAIL_P,
    to: email,
    subject: "Credit Transaction Alert",
    html: `
        <div style="background: #121212; text-align: center;">
            <h1 style="font-size: 45px; font-weight: bold; background: #121212; color:#fff;padding:10px 0px;">OTCIX</h1>
        </div>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            <h3 style="color: #333; font-size: 25px; margin-bottom: 5px;">Deposit for  <span >${name}</span>,</h3>
             
             <h3 style="color: #333; font-size: 18px; margin-bottom: 5px;">Deposit for  <span >${mainTransaction.amount}    ${mainTransaction.asset}  .</h3>
             
             <h3 style="color: #333; font-size: 16px; margin-bottom: 5px;">  <span >${formattedTime}</span></h3>
            <h5 style="color: #333; font-size: 17px; margin-bottom: 5px;">Best regards,<br>OTCIX Team</h5>
        </div>
        <div style="text-align: center; margin-top: 20px; color: #888; font-size: 13px;">
            <h6>This is an automated message, please do not reply to this email.</h6>
        </div>`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = {
  getAllTransactionsController,
  getAllUserTransactionsController,
  getAllTransactionWithWalletController,
};
