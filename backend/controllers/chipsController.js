const chipsModel = require("../models/chipsModel");
const cloudinary = require("../utilis/cloudinaryConfig");

// Add Chip Controller
const addChipController = async (req, res) => {
  try {
    const { title, description, price, status } = req.body;
    const file = req.file;

    // Validate required fields
    if (!title || !description || !price || !file) {
      return res.status(400).send({
        success: false,
        message: "All fields (title, description, price, image) are required",
      });
    }

    // Validate image file type
    if (!file.mimetype.startsWith("image/")) {
      return res.status(400).send({
        success: false,
        message: "Only image files are allowed",
      });
    }

    // Handle image upload to Cloudinary
    let imageUrl = "";
    try {
      const publicId = `chips/${title
        .replace(/\s+/g, "-")
        .toLowerCase()}-${Date.now()}`;
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "image", public_id: publicId },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        const stream = require("stream");
        const bufferStream = new stream.PassThrough();
        bufferStream.end(file.buffer);
        bufferStream.pipe(uploadStream);
      });
      imageUrl = result.secure_url;
    } catch (uploadError) {
      console.error("Error uploading to Cloudinary:", uploadError);
      return res.status(500).send({
        success: false,
        message: "Error uploading image to Cloudinary",
        error: uploadError.message,
      });
    }

    // Create new chip
    const chip = new chipsModel({
      title,
      description,
      price: Number(price),
      image: imageUrl,
      status: Number(status) || 0,
    });

    await chip.save();

    res.status(201).send({
      success: true,
      message: "Chip added successfully",
      data: chip,
    });
  } catch (error) {
    console.error("Error in addChipController:", error);
    res.status(500).send({
      success: false,
      message: "Error in adding chip",
      error: error.message,
    });
  }
};

// Edit Chip Controller
const editChipController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, status } = req.body;
    const file = req.file;

    // Find existing chip
    const chip = await chipsModel.findById(id);
    if (!chip) {
      return res.status(404).send({
        success: false,
        message: "Chip not found",
      });
    }

    // Handle image update
    let imageUrl = chip.image;
    if (file) {
      // Validate image file type
      if (!file.mimetype.startsWith("image/")) {
        return res.status(400).send({
          success: false,
          message: "Only image files are allowed",
        });
      }

      // Delete existing image from Cloudinary
      if (chip.image) {
        const publicId = chip.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`chips/${publicId}`);
      }

      // Upload new image to Cloudinary
      try {
        const publicId = `chips/${(title || chip.title)
          .replace(/\s+/g, "-")
          .toLowerCase()}-${Date.now()}`;
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "image", public_id: publicId },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          const stream = require("stream");
          const bufferStream = new stream.PassThrough();
          bufferStream.end(file.buffer);
          bufferStream.pipe(uploadStream);
        });
        imageUrl = result.secure_url;
      } catch (uploadError) {
        console.error("Error uploading to Cloudinary:", uploadError);
        return res.status(500).send({
          success: false,
          message: "Error uploading image to Cloudinary",
          error: uploadError.message,
        });
      }
    }

    // Update chip fields
    chip.title = title || chip.title;
    chip.description = description || chip.description;
    chip.price = price ? Number(price) : chip.price;
    chip.image = imageUrl;
    chip.status = status !== undefined ? Number(status) : chip.status;

    await chip.save();

    res.status(200).send({
      success: true,
      message: "Chip updated successfully",
      data: chip,
    });
  } catch (error) {
    console.error("Error in editChipController:", error);
    res.status(500).send({
      success: false,
      message: "Error in updating chip",
      error: error.message,
    });
  }
};

// Delete Chip Controller
const deleteChipController = async (req, res) => {
  try {
    const { id } = req.params;

    // Find chip
    const chip = await chipsModel.findById(id);
    if (!chip) {
      return res.status(404).send({
        success: false,
        message: "Chip not found",
      });
    }

    // Delete image from Cloudinary
    if (chip.image) {
      const publicId = chip.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`chips/${publicId}`);
    }

    // Delete chip from database
    await chipsModel.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: "Chip deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteChipController:", error);
    res.status(500).send({
      success: false,
      message: "Error in deleting chip",
      error: error.message,
    });
  }
};

// Get All Chips Controller
const getAllChipsController = async (req, res) => {
  try {
    const chips = await chipsModel.find().sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "Chips retrieved successfully",
      chips,
    });
  } catch (error) {
    console.error("Error in getAllChipsController:", error);
    res.status(500).send({
      success: false,
      message: "Error in retrieving chips",
      error: error.message,
    });
  }
};

// Get Single Chip Controller
const getSingleChipController = async (req, res) => {
  try {
    const { id } = req.params;
    const chip = await chipsModel.findById(id);
    if (!chip) {
      return res.status(404).send({
        success: false,
        message: "Chip not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Chip retrieved successfully",
      data: chip,
    });
  } catch (error) {
    console.error("Error in getSingleChipController:", error);
    res.status(500).send({
      success: false,
      message: "Error in retrieving chip",
      error: error.message,
    });
  }
};

module.exports = {
  addChipController,
  editChipController,
  deleteChipController,
  getAllChipsController,
  getSingleChipController,
};
