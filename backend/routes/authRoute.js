const express = require("express");
const {
  registerController,
  loginController,
  forgotPasswordController,
  verifyEmailController,
  logoutController,
  resetPasswordController,
  otpSendController,
  changeEmailController,

  getAlluserController,
  getSingleUserController,

  googleAuthController,
} = require("../controllers/authController");
const {
  requireSignIn,
  isAdmin,
  checkPermission,
} = require("../middlewares/authMiddleware");
const { contactFormController } = require("../controllers/contactController");
const router = express.Router();

//Register Route
router.post("/register", registerController);
router.post("/google-auth", googleAuthController);
// verify
router.post("/verify-email", verifyEmailController);
//login route
router.post("/login", loginController);
//again otp send
router.post("/send-otp-again", otpSendController);
//change email
router.post("/change-email", changeEmailController);
//logout
router.post("/logout", logoutController);
//Forgot password
router.post("/forgot-password", forgotPasswordController);
//reset password
router.post("/reset-password/:token", resetPasswordController);
//test route
router.get("/m-users", requireSignIn, isAdmin, getAlluserController);

//get single user
router.get("/get-user/:id", requireSignIn, getSingleUserController);
router.post("/submit-complaint", contactFormController);

module.exports = router;
