const express = require("express");
const {
  requireSignIn,
  isAdmin,
  checkPermission,
} = require("../middlewares/authMiddleware");
const {
  getAllTransactionsController,
  getAllUserTransactionsController,
  getAllTransactionWithWalletController,
} = require("../controllers/transactionController");

const router = express.Router();
//routes
//create

//All  Transactions
router.get(
  "/transactions",
  requireSignIn,
  isAdmin,
  checkPermission("transactions", "view"),
  getAllTransactionsController
);
router.get(
  "/user-transactions",
  requireSignIn,
  getAllTransactionWithWalletController
);

router.get(
  "/user-transactions/:id",
  requireSignIn,
  getAllUserTransactionsController
);

module.exports = router;
