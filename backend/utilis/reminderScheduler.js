// Scheduler to send reminder emails to new users for KYC and wallet creation

const cron = require("node-cron");
const User = require("../models/UserModel");
const Kyc = require("../models/kycModel");
const Wallet = require("../models/WalletModel");
const nodemailer = require("nodemailer");
const createTransporter = require("../config/emailConfig");

async function sendReminderEmail(user, type) {
  if (type === "kyc") {
    await sendKycAlertEmail(user.email, user.name);
  } else {
    await sendCryptoAlertEmail(user.email, user.name);
  }
}

const sendKycAlertEmail = async (email, name) => {
  try {
    // Configure the email transport using nodemailer
    const transporter = createTransporter();

    // Email options
    const mailOptions = {
      from: process.env.AUTH_EMAIL_P,
      to: email,
      subject: "PQS KYC Reminder",
      text: `Dear ${name},\n\nPlease complete your KYC information to access all features of your account.\n\nBest regards,\nPQS Team`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending KYC alert email:", error);
  }
};

const sendCryptoAlertEmail = async (email, name) => {
  try {
    // Configure the email transport using nodemailer
    const transporter = createTransporter();

    // Email options
    const mailOptions = {
      from: process.env.AUTH_EMAIL_P,
      to: email,
      subject: "PQS Alert",
      html: `<div style="background: linear-gradient(135deg, #0E2340 0%, #1a3a5c 100%); padding: 10px 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <img src="https://mbdnetwork.com/assets/images/logo.png" alt="PQS Logo" style="max-height: 90px; width: auto;" />
        </div>
        
        <!-- Main Content -->
        <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6;">
          
          
            
            <p style="font-size: 18px; color: #333; margin-bottom: 15px;">Dear <strong>${name}</strong>,</p>
            
         
          
          <!-- Crypto Wallet Section -->
          <div style="margin-bottom: 30px;">
            <h2 style="color: #0E2340; font-size: 24px; margin-bottom: 20px; border-bottom: 2px solid #e8f4fd; padding-bottom: 10px;">Crypto Wallet Setup</h2>
            
            <div style="background: linear-gradient(135deg, #f8f9ff 0%, #e8f4fd 100%); padding: 25px; border-radius: 12px; border: 1px solid #d1ecf1; margin: 20px 0;">
              <div style="display: flex; align-items: center; margin-bottom: 15px;">
                 
                 
              </div>
              
              <p style="font-size: 17px; color: #333; margin-bottom: 20px;">
                We have noticed that no crypto wallet was added to your account.

              </p>
              
              <div style="text-align: center; margin: 25px 0;">
                <a href="https://www.pqs.fund/dashboard/user/add-wallet" style="background: linear-gradient(135deg, #0E2340 0%, #1a3a5c 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: bold; display: inline-block; box-shadow: 0 4px 8px rgba(14, 35, 64, 0.3); transition: all 0.3s ease;">
                  Add Crypto Wallet Now
                </a>
              </div>
              
              <p style="font-size: 15px; color: #666; text-align: center; margin: 15px 0 0 0; font-style: italic;">
                Please ignore this section if you don't require a crypto wallet at this moment.
              </p>
            </div>
          </div>
          
          <!-- Security Notice -->
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #dc3545; margin: 25px 0;">
            <h3 style="color: #dc3545; margin-top: 0; font-size: 18px;">🔒 Security Reminder</h3>
            <p style="font-size: 16px; color: #495057; margin-bottom: 0;">
              PQS will never ask for confidential information through calls, emails, or websites. Never share your CVV, Username, Password, OTP, or other sensitive details.
            </p>
          </div>
          
          <!-- Contact Information -->
          <div style="background: #ffffff; padding: 25px; border-radius: 8px; border: 1px solid #e9ecef; margin: 25px 0;">
            <h3 style="color: #0E2340; margin-top: 0; margin-bottom: 20px; font-size: 20px;">📞 Need Help?</h3>
            <p style="font-size: 16px; color: #333; margin-bottom: 15px;">Contact our support team:</p>
            
            <div style="display: grid; gap: 12px;">
              <div style="display: flex; align-items: center; padding: 10px; background: #f8f9fa; border-radius: 6px;">
                 
                <div>
                  <strong style="color: #0E2340;">Email:</strong>
                  <a href="mailto:support@pqs.fund" style="color: #0066cc; text-decoration: none; margin-left: 8px;">support@pqs.fund</a>
                </div>
              </div>
              
              <div style="display: flex; align-items: center; padding: 10px; background: #f8f9fa; border-radius: 6px;">
                 
                <div>
                  <strong style="color: #0E2340;">Phone:</strong>
                  <a href="tel:+442071775747" style="color: #0066cc; text-decoration: none; margin-left: 8px;">+44 2071775747</a>
                </div>
              </div>
              
              <div style="display: flex; align-items: center; padding: 10px; background: #f8f9fa; border-radius: 6px;">
                 
                <div>
                  <strong style="color: #0E2340;">Website:</strong>
                  <a href="https://www.pqs.fund/contact/" style="color: #0066cc; text-decoration: none; margin-left: 8px;">www.pqs.fund/contact/</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px;">
          <p style="color: #6c757d; font-size: 14px; margin: 0; line-height: 1.5;">
            This is an automated message, please do not reply to this email.<br>
            <span style="font-size: 12px;">© 2025 PQS. All rights reserved.</span>
          </p>
        </div>

      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log("Error occurred:", error.message);
      }
      console.log("Message sent: %s", info.messageId);
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

async function startReminderScheduler() {
  // Scheduler runs every hour (adjust as needed)
  cron.schedule("0 * * * *", async () => {
    console.log("Running reminder scheduler at", new Date());
    try {
      const now = new Date();
      // 1. Users registered 1+ day ago, no KYC, no KYC reminder sent
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const usersNoKyc = await User.find({
        createdAt: { $lte: oneDayAgo },
        kycReminderSent: { $ne: true },
      });
      for (const user of usersNoKyc) {
        // Double check in Kyc collection (in case)
        const kyc = await Kyc.findOne({ userID: user._id });
        if (!kyc) {
          await sendReminderEmail(user, "kyc");
          user.kycReminderSent = true;
          await user.save();
        }
      }

      // 2. Users registered 2+ days ago, no wallet, no wallet reminder sent
      const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
      const usersNoWallet = await User.find({
        createdAt: { $lte: twoDaysAgo },
        walletReminderSent: { $ne: true },
      });
      for (const user of usersNoWallet) {
        const wallet = await Wallet.findOne({ userId: user._id });
        if (!wallet) {
          if (!user.walletReminderSent) {
            await sendReminderEmail(user, "wallet");
            user.walletReminderSent = true;
            await user.save();
          }
        }
      }
      console.log("Reminder scheduler ran successfully");
    } catch (err) {
      console.error("Error in reminder scheduler:", err);
    }
    console.log("Reminder scheduler ran at", new Date());
  });
}

module.exports = { startReminderScheduler };
