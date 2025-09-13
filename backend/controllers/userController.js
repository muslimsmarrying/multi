const { hashPassword } = require("../helpers/authHelper");
const UserModel = require("../models/UserModel");
const ProfileModel = require("../models/profileModel");
const NotifyModel = require("../models/notifyModel");
const BalanceModel = require("../models/balanceModel");
const logAdminActivity = require("../utilis/logAdminActivity");
const createTransporter = require("../config/emailConfig");
const axios = require("axios");
const WalletModel = require("../models/WalletModel");
const addNewUserController = async (req, res) => {
  try {
    const {
      identityType,
      designation,
      firstName,
      lastName,
      phone,
      email,
      dob,
      gender,
      postal,
      address,
      street,
      city,
      state,
      country,
      companyName,
      companyAddress,
      countryOfInc,
      registrationNumber,
      password,
      notification,
    } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .send({ success: false, message: "Missing fields" });

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Email already registered",
      });
    }

    const fullName =
      identityType === "company" ? companyName : `${firstName} ${lastName}`;

    const hashedPassword = await hashPassword(password);

    const newUser = await new UserModel({
      name: fullName,
      email,
      password: hashedPassword,
      isVerified: true,
      kycstatus: 2,
      kycReminderSent: true,
    }).save();

    // Create Profile
    const profileData = {
      userId: newUser._id,
      identityType,
      postal,
      address,
      street,
      city,
      email,
    };

    if (identityType === "individual") {
      Object.assign(profileData, {
        firstName,
        lastName,
        phone,
        dob,
        gender,
        state,
        country,
        designation,
      });
    } else if (identityType === "company") {
      Object.assign(profileData, {
        firstName: companyName,
        companyName,
        companyAddress,
        countryOfInc,
        registrationNumber,
      });
    }

    await new ProfileModel(profileData).save();

    // Save notification preference
    await new NotifyModel({
      userId: newUser._id,
      notification,
    }).save();

    // Send welcome email if notification is true
    if (notification === true || notification === "true") {
      try {
        await sendWelcomeEmail(email, fullName);
      } catch (emailErr) {
        console.error("Error sending welcome email:", emailErr.message);
      }
    }

    // Log admin activity
    const adminId = req.user?.id;
    await logAdminActivity(
      req,
      adminId,
      "Add User",
      `Manually added user: ${fullName} (${email})`
    );

    return res.status(201).send({
      success: true,
      message: "User created successfully",
      userId: newUser._id,
    });
  } catch (error) {
    console.error("Error in addNewUserController:", error);
    res.status(500).send({
      success: false,
      message: "Server error while adding user",
      error: error.message,
    });
  }
};

const getSingleProfileController = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).send({
        success: false,
        message: "User ID is required",
      });
    }

    const profile = await ProfileModel.findOne({ userId }).populate(
      "userId",
      "email name"
    );

    if (!profile) {
      return res.status(404).send({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Profile fetched successfully",
      profile,
    });
  } catch (error) {
    console.error("Error in getSingleProfileController:", error.message);
    res.status(500).send({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const getUserBalances = async (req, res) => {
  const userId = req.user.id;

  try {
    // 1. Check if user exists
    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist." });
    }

    // 2. Fetch balances
    const wallets = await WalletModel.find({ userId });

    // 3. Symbol to CoinGecko ID map
    const symbolToId = {
      usdt: "tether",
      btc: "bitcoin",
      eth: "ethereum",
      bnb: "binancecoin",
      sol: "solana",
      matic: "matic-network",
      ada: "cardano",
      tron: "tron",
      // add more as needed
    };

    // 4. Get CoinGecko IDs (not symbols)
    const uniqueCGIds = [
      ...new Set(
        wallets
          .map((b) => symbolToId[b.network.split("-")[0].toLowerCase()])
          .filter((id) => !!id) // only include mapped tokens
      ),
    ];

    // 5. Fetch prices from CoinGecko
    const { data: pricesData } = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${uniqueCGIds.join(
        ","
      )}&vs_currencies=usd`
    );
    console.log(pricesData);

    // 6. Attach price to each balance
    const balancesWithPrices = wallets.map((wal) => {
      const assetKey = wal.network.split("-")[0].toLowerCase();
      const cgId = symbolToId[assetKey];
      const price = pricesData[cgId]?.usd || 0;

      return {
        ...wal.toObject(),
        price,
      };
    });

    return res
      .status(200)
      .json({ success: true, balances: balancesWithPrices });
  } catch (error) {
    console.error("Error fetching balances:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch balances." });
  }
};
const sendWelcomeEmail = async (email, name) => {
  // Configure the email transport using nodemailer
  const transporter = createTransporter();

  // Email options
  const mailOptions = {
    from: process.env.AUTH_EMAIL_P,
    to: email,
    subject: "Welcome to OTCIX",
    html: `<div style="background: #121212 ; text-align: center;">
     <h1 style="font-size: 45px; font-weight: bold; background: #121212; color:#fff;padding:10px 0px; " >OTCIX</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p style="font-size: 17px;" >Hello   ${name},  </p> 
        
    <p style="font-size: 17px;">Your account has successfully been verified, please use the link below to access the dashboard.</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${process.env.CLIENT_URL}/dashboard/user" style="font-size: 30px; background: #121212; color:#fff;padding:10px 30px;border-radius:5px;text-decoration:none">Dashboard</a>
    </div>
     
    <h5 style="font-size: 17px;">Best regards,<br>OTCIX Team</h5>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 13px;">
    <h6>This is an automated message, please do not reply to this email.</h6>
  </div>`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = {
  addNewUserController,
  getSingleProfileController,
  getUserBalances,
};
