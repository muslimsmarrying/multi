const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const {
  addNewUserController,
  getSingleProfileController,
  getUserBalances,
} = require("../controllers/userController");

const router = express.Router();

//new
router.post("/add-user", requireSignIn, isAdmin, addNewUserController);
router.get("/profile/:userId", requireSignIn, getSingleProfileController);
router.get("/get-balances", requireSignIn, getUserBalances);

module.exports = router;
