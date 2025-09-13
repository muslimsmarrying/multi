const UAParser = require("ua-parser-js");
const getLocationFromIP = require("./getLocationFromIP");
const UserActivity = require("../models/usersActivityModel");

const logUserActivity = async (req, userId, activity, description) => {
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
      browser: ua.browser.name,
      os: ua.os.name,
      type: ua.device.type,
      model: ua.device.model,
      vendor: ua.device.vendor,
    };

    await UserActivity.create({
      userId,
      activity,
      description,
      ipAddress: ip,
      location,
      userAgent: userAgentString,
      deviceInfo: deviceInfo,
    });
  } catch (err) {
    console.error("Error logging user activity:", err.message);
  }
};

module.exports = logUserActivity;
