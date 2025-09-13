const speakeasy = require("speakeasy");
const QRCode = require("qrcode");
const adminModel = require("../models/adminModel");

const verifyTOTP = async (req, res, next) => {
  try {
    const admin = await adminModel.findById(req.user.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    // If 2FA is not set up, generate and return a new secret with QR code
    if (!admin.is2FAVerified) {
      const secret = speakeasy.generateSecret({
        name: `OTCIX (${admin.email})`, // You can customize this
        length: 20,
      });

      // Generate QR code URL
      let qrCodeUrl;
      try {
        qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);
      } catch (qrError) {
        console.error("QR Code generation error:", qrError);
        return res.status(500).json({
          success: false,
          message: "Failed to generate QR code.",
        });
      }

      // Save the secret to the admin (but don't mark as verified yet)
      admin.totpSecret = secret.base32;
      await admin.save();

      return res.status(206).json({
        // 206 Partial Content
        success: true,
        message: "2FA needs to be set up",
        data: {
          secret: secret.base32,
          qrCodeUrl,
          otpauthUrl: secret.otpauth_url,
        },
      });
    }

    // If 2FA is set up, verify the token
    const token = req.headers["x-2fa-token"];
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "2FA token is required in headers.",
      });
    }

    const isValid = speakeasy.totp.verify({
      secret: admin.totpSecret,
      encoding: "base32",
      token,
      window: 1,
    });

    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired 2FA code.",
      });
    }

    next();
  } catch (error) {
    console.error("2FA verification error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during 2FA verification.",
    });
  }
};

module.exports = verifyTOTP;
