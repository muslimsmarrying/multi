const axios = require("axios");
const ChainData = require("./ChainData");

const getWalletTransactions = async () => {
  try {
    const options = {
      method: "GET",
      url: `https://api.tatum.io/v3/tron/transaction/account/TMgu9qhJbynffgt3TWgcSyDiLsEiVhGx46`,
      headers: {
        accept: "application/json",
        "x-api-key": "t-679b64a51db825b185ad210b-82a1dd12f0654d3987a90024",
      },
    };

    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(`Error fetching  xrp wallet data:`, error);
    throw new Error(`Failed to fetch  xrp wallet data: ${error.message}`);
  }
};

const getChainIdForAsset = (asset) => {
  const assetData = ChainData.find((item) =>
    item.name.toLowerCase().includes(asset.toLowerCase())
  );
  return assetData ? assetData.chain_id : null;
};
const generateRandomString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const getPayoutStatus = (status) => {
  let payoutStatus = "pending";
  switch (status) {
    case 2:
    case 4:
      payoutStatus = "rejected";
      break;
    case 6:
      payoutStatus = "paid";
      break;
    case 7:
      payoutStatus = "failed";
      break;
  }
  return payoutStatus;
};

module.exports = {
  getWalletTransactions,
  getChainIdForAsset,
  generateRandomString,
  getPayoutStatus,
};
