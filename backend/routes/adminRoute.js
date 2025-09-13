const express = require("express");
const {
  loginAdminController,
  registerNewAdminController,
  verifyAdminLoginController,
  LoginAdminOtpAgainController,
  getAllSubAdminController,
  deleteAdminController,
  updateAdminController,
  forgotPasswordController,
  resetPasswordController,
  getAllActivities,
  getSingleAdminDetails,
} = require("../controllers/adminController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const adminModel = require("../models/adminModel");

const router = express.Router();

router.post("/admin-login", loginAdminController);
router.post(
  "/reg-sub-admin",
  requireSignIn,
  isAdmin,
  registerNewAdminController
);
router.post("/admin-verify-login", verifyAdminLoginController);
router.post("/admin-login-otp-again", LoginAdminOtpAgainController);
router.post("/forgot-password-admin", forgotPasswordController);
router.post("/reset-password-admin/:token", resetPasswordController);
router.get(
  "/get-all-sub-admins",
  requireSignIn,
  isAdmin,
  getAllSubAdminController
);
router.get(
  "/get-admin-details/:id",
  requireSignIn,
  isAdmin,
  getSingleAdminDetails
);
router.delete(
  "/delete-sub-admin/:id",
  requireSignIn,
  isAdmin,
  deleteAdminController
);
router.put(
  "/edit-admin/:adminId",
  requireSignIn,
  isAdmin,
  updateAdminController
);
router.get("/activities", requireSignIn, isAdmin, getAllActivities);

module.exports = router;
