const UAParser = require("ua-parser-js");
const getLocationFromIP = require("./getLocationFromIP");
const AdminActivity = require("../models/adminActivityModel");

const logAdminActivity = async (req, adminId, activity, description) => {
  try {
    const userAgentString = req.get("User-Agent");
    const parser = new UAParser(userAgentString);
    const ua = parser.getResult();

    const ip =
      process.env.NODE_ENV === "development"
        ? "103.186.79.66"
        : req.headers["x-forwarded-for"]?.split(",")[0] ||
          req.connection?.remoteAddress ||
          req.socket?.remoteAddress ||
          "Unknown";

    const location = await getLocationFromIP(ip);

    const deviceInfo = {
      browser: ua.browser?.name || "Unknown",
      os: ua.os?.name || "Unknown",
      type: ua.device?.type || "Unknown",
      model: ua.device?.model || "Unknown",
      vendor: ua.device?.vendor || "Unknown",
    };

    await AdminActivity.create({
      adminId,
      activity,
      description,
      ipAddress: ip,
      location,
      userAgent: userAgentString,
      deviceInfo,
    });
  } catch (err) {
    console.error("Error logging admin activity:", err.message);
  }
};

module.exports = logAdminActivity;
