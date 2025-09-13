const express = require("express");
const router = express.Router();
const upload = require("../utilis/upload");
const {
  addChipController,
  editChipController,
  deleteChipController,
  getAllChipsController,
  getSingleChipController,
} = require("../controllers/chipsController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

// Routes for chips management
router.post(
  "/add-chip",
  upload.single("image"),
  requireSignIn,
  isAdmin,
  addChipController
);
router.put(
  "/edit-chip/:id",
  requireSignIn,
  isAdmin,
  upload.single("image"),
  editChipController
);
router.delete("/delete-chip/:id", requireSignIn, isAdmin, deleteChipController);
router.get("/get-all-chips", getAllChipsController);
router.get("/get-chip/:id", getSingleChipController);

module.exports = router;
