const axios = require("axios");
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();

const cregis_url = process.env.CREGIS_URL;
const cregis_api = process.env.CREGIS_API;
const cregis_pid = process.env.CREGIS_PID;

const cregisAxios = axios.create({
  baseURL: cregis_url,
});

function generateSign(apiKey, params) {
  // Step 1: Remove null or empty values
  const filteredParams = Object.entries(params).filter(
    ([_, value]) => value !== null && value !== undefined && value !== ""
  );

  // Step 2: Sort the parameters lexicographically by their keys
  const sortedParams = filteredParams.sort(([keyA], [keyB]) =>
    keyA.localeCompare(keyB)
  );

  // Step 3: Concatenate the sorted parameters in the format key1value1key2value2...
  const concatenatedString = sortedParams
    .map(([key, value]) => `${key}${value}`)
    .join("");

  // Step 4: Prepend the API Key to the concatenated string
  const stringToHash = apiKey + concatenatedString;

  // Step 5: Compute the MD5 hash of the resulting string
  const sign = crypto.createHash("md5").update(stringToHash).digest("hex");

  return sign;
}

const getTransactionFromTxid = async (tx_id) => {
  try {
    // Create final payload with sign
    const payload = constructPayload({ tx_id });

    const { data } = await cregisAxios.post("/api/v1/trade/page", payload);

    if (data.msg === "ok" && data.data && data.data?.rows?.length > 0) {
      return data.data.rows[0];
    } else {
      throw new Error("Transaction not found or API returned an error");
    }
  } catch (err) {
    console.error("Error fetching transaction:", err);
    throw new Error(err.response?.data?.msg || "Transaction not found");
  }
};

const constructPayload = (params) => {
  // Create base payload without API key and sign
  const basePayload = {
    ...params,
    pid: cregis_pid,
    timestamp: Date.now(),
    nonce: Math.random().toString(36).substring(2, 15),
  };

  // Generate sign
  const sign = generateSign(cregis_api, basePayload);

  // Return final payload with sign
  return {
    ...basePayload,
    sign,
  };
};

const checkStatus = (status) => {
  let statusText = "Pending";
  switch (status) {
    case 0:
      statusText = "Pending";
      break;
    case 1:
      statusText = "Completed";
      break;
    case 2:
      statusText = "Failed";
      break;
    default:
      statusText = "Unknown";
  }
  return statusText;
};

module.exports = {
  generateSign,
  getTransactionFromTxid,
  constructPayload,
  checkStatus,
};
