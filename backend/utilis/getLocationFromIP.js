const axios = require("axios");

const getLocationFromIP = async (ip) => {
  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    const data = response.data;
    if (data.status === "success") {
      return `${data.city}, ${data.regionName}, ${data.country}`;
    } else {
      return "Unknown Location";
    }
  } catch (error) {
    console.error("GeoIP Lookup Error:", error.message);
    return "Location Fetch Failed";
  }
};

module.exports = getLocationFromIP;
