const {
  hashPassword,
  comparePassword,
  generateTokenAndSetCookie,
  getFormattedDateTime,
  generateRandomString,
} = require("../helpers/authHelper");
const UserModel = require("../models/UserModel");
const crypto = require("crypto");
const createTransporter = require("../config/emailConfig");
const adminModel = require("../models/adminModel");
const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//google register
const googleAuthController = async (req, res) => {
  try {
    const { idToken, access_token } = req.body;
    let userInfo = null;
    if (access_token) {
      const googleRes = await axios.get(
        "https://openidconnect.googleapis.com/v1/userinfo",
        { headers: { Authorization: `Bearer ${access_token}` } }
      );
      userInfo = googleRes.data;
    } else {
      const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      userInfo = ticket.getPayload();
    }

    const { email, name } = userInfo;

    let user = await UserModel.findOne({ email });

    if (!user) {
      user = await new UserModel({
        name,
        email,
        password: "", // or empty string if using passwordless
        isVerified: true,
      }).save();

      const allAdmins = await adminModel.find({});
      const adminEmails = allAdmins.map((admin) => admin.email);
      sendNewUserRegEmail(adminEmails, name);
    }
    const { date, time } = getFormattedDateTime();

    sendLoginEmail(user.email, user.name, time, date);

    const token = await generateTokenAndSetCookie(res, user._id);

    const filteredUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
      status: user.status,
    };
    return res.status(200).send({
      success: true,
      message: "Google Login successful",
      protect: generateRandomString(20),
      user: filteredUser,
      token,
    });
  } catch (error) {
    console.log("Google Auth Error:", error);
    res.status(500).send({
      success: false,
      message: "Error with Google Authentication",
    });
  }
};
//Register
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic Validation
    if (!name) return res.send({ message: "Name is Required" });
    if (!email) return res.send({ message: "Email is Required" });
    if (!password) return res.send({ message: "Password is Required" });

    // Check if user exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Email Already Registered !! Please Login",
      });
    }
    // Hash password and create user
    const hashedPassword = await hashPassword(password);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = await new UserModel({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 10 * 60 * 1000, // 10 mins
    }).save();

    // Generate JWT cookie
    const token = await generateTokenAndSetCookie(res, user._id);

    // Prepare selected user fields
    const filteredUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
      status: user.status,
    };

    // Final response
    res.status(201).send({
      success: true,
      message:
        "Account Created Successfully. Please check your email for the OTP.",
      user: filteredUser,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};
//again otp
const otpSendController = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).send({ message: "Email is Required" });
    }

    // check email and answer
    const user = await UserModel.findOne({ email });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email Not Found",
      });
    }

    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    // Generate OTP and timeotp
    const vte = Date.now() + 10 * 60 * 1000;
    (user.verificationToken = verificationToken),
      (user.verificationTokenExpiresAt = vte);
    await user.save();
    // Send OTP via email
    await sendOtpEmail(email, user.name, verificationToken);

    const filteredUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
      status: user.status,
    };
    res.status(201).send({
      success: true,
      message: `OTP Send again to ${user.email} . Please check your email for the OTP.`,
      user: filteredUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Sending OTP",
      error,
    });
  }
};
//change email controller
const changeEmailController = async (req, res) => {
  try {
    const { email, oldemail } = req.body;

    // Check if both old and new email are provided
    if (!email || !oldemail) {
      return res.status(400).send({ message: "email is required." });
    }
    if (email === oldemail) {
      return res.status(200).send({
        success: false,
        message: "New Email and Old email Can not be same",
      });
    }

    const alreadyEmail = await UserModel.findOne({ email });
    if (alreadyEmail) {
      return res.status(200).send({
        success: false,
        message: "Email Already Registered",
      });
    }
    // Find user by the old email
    const user = await UserModel.findOne({ email: oldemail });

    // Validation: Check if user exists
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found.",
      });
    }

    // Generate OTP and its expiration time
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const verificationTokenExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

    // Update user's email to new email
    user.email = email;
    user.verificationToken = verificationToken;
    user.verificationTokenExpiresAt = verificationTokenExpiresAt;

    // Save the updated user information
    await user.save();

    // Send OTP via email to the new email address
    await sendOtpEmail(email, user.name, verificationToken);

    const filteredUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
      status: user.status,
    };
    // Respond with success message
    res.status(200).send({
      success: true,
      message: `OTP sent to new Email ${email}. Please check your new email for verification.`,
      user: filteredUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in updating email and sending OTP.",
      error,
    });
  }
};

//Verify Email
const verifyEmailController = async (req, res) => {
  const { code } = req.body;
  try {
    // Check if the user already exists
    const user = await UserModel.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Invalid or expired verification code !!",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);
    const token = await generateTokenAndSetCookie(res, user._id);

    const filteredUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
      status: user.status,
    };
    // Send OTP via email
    res.status(201).send({
      success: true,
      message: "Email verified successfully.",
      user: filteredUser,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Verification Email",
      error,
    });
  }
};
// LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(200).send({
        success: false,
        message: "Invalid Email!! or Password",
      });
    }
    //check user
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Email not Found!",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const isVerified = await user.isVerified;
    if (!isVerified) {
      const protect = generateRandomString(20);
      const verificationToken = Math.floor(
        100000 + Math.random() * 900000
      ).toString();
      const verificationTokenExpiresAt = Date.now() + 10 * 60 * 1000;
      const condition = 204;
      user.verificationToken = verificationToken;
      user.verificationTokenExpiresAt = verificationTokenExpiresAt;

      // Save the updated user information
      await user.save();
      await sendOtpEmail(user.email, user.name, verificationToken);

      return res.status(201).send({
        success: false,
        message: "Email not verified.",
        protect,
        condition,
        email: user.email,
      });
    }
    const status = await user.status;
    if (status === 1) {
      return res.status(201).send({
        success: false,
        message: "Account Locked Please Contact Admin",
      });
    }

    user.lastLogin = new Date();
    await user.save();
    const token = await generateTokenAndSetCookie(res, user._id);

    const filteredUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
      status: user.status,
    };
    res.status(200).send({
      success: true,
      message: "Logged in",
      user: filteredUser,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};
//

//logout
const logoutController = async (req, res) => {
  res.clearCookie("token");

  res.status(201).send({
    success: true,
    message: "Logged out successfully!",
  });
};
//forgot password Controller

const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(200).send({
        success: false,
        message: "Email is Required",
      });
    }

    // check email and answer
    const user = await UserModel.findOne({ email });
    //validation
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Email Not Found",
      });
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();
    await forgotPasswordEmail(
      user.email,
      user.name,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

    return res.status(200).send({
      success: true,
      message: "Password reset link sent to your email !",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in sending rest password link",
      error,
    });
  }
};
//reset password controller
const resetPasswordController = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    // check email and answer
    const user = await UserModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    //validation
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Invalid Token or Reset Link Expired !!",
      });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();
    const { date, time } = getFormattedDateTime();
    await resetPasswordEmail(user.email, user.name, time, date);

    return res.status(200).send({
      success: true,
      message: "Password Changed Successfully !",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in changing password ",
      error,
    });
  }
};

const getAlluserController = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");

    if (!users || users.length === 0) {
      return res
        .status(204)
        .json({ success: false, message: "No users found" });
    }

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.log("Error in getting users: ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

//get single user

const getSingleUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id).select(
      "-password -lastLogin -updatedAt"
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Account not found" });
    }

    // Respond with success
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Function to send OTP via email
const sendOtpEmail = async (email, name, verificationToken) => {
  // Configure the email transport using nodemailer
  const transporter = createTransporter();

  // Email options
  const mailOptions = {
    from: process.env.AUTH_EMAIL_P,
    to: email,
    subject: "Welcome to CURESLEEP SOLUTIONS",
    html: `<div style="background: #121212 ; text-align: center;">
     <h1 style="font-size: 45px; font-weight: bold; background: #121212; color:#fff;padding:10px 0px; " >CURESLEEP SOLUTIONS</h1>
  </div>
  <div style=" padding: 20px; font-size: 17px;  ">
    <p style="font-size: 17px;  ">Dear   ${name},  <br> <br> 
     Thank you for registering with CURESLEEP SOLUTIONS. Please verify your email by using the below code.</h5>
       <div style="color: #121212;  display: inline-block; padding: 10px 20px; border-radius: 4px; font-size: 30px; letter-spacing: 1.5px;">
                <strong>${verificationToken}</strong>
            </div>
     <p style="color: #333; font-size: 17px; margin-bottom: 5px;">Please use the  OTP to complete your registration process. This OTP is valid for 10 minutes.</p>
    <h5 style="font-size: 17px;">Best regards,<br>CURESLEEP SOLUTIONS Team</h5>
    
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 13px;">
    <h6>This is an automated message, please do not reply to this email.</h6>
  </div>`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

const sendNewUserRegEmail = async (email, name) => {
  // Configure the email transport using nodemailer
  const transporter = createTransporter();

  // Email options
  const mailOptions = {
    from: process.env.AUTH_EMAIL_P,
    to: email,
    subject: "New User Register at CURESLEEP SOLUTIONS",
    html: `<div style="background: #121212 ; text-align: center;">
     <h1 style="font-size: 45px; font-weight: bold; background: #121212; color:#fff;padding:10px 0px; " >CURESLEEP SOLUTIONS</h1>
  </div>
  <div style=" padding: 20px; font-size: 17px;  ">
    <p style="font-size: 20px;  ">Dear   Admin,   </p>  
    <h5 style="font-size: 19px;  ">
      ${name} has just created new account. Make sure to check its details further .</h5>
        
    
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 13px;">
    <h6>This is an automated message, please do not reply to this email.</h6>
  </div>`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};
const sendOtpLoginEmail = async (email, name, verificationToken) => {
  // Configure the email transport using nodemailer
  const transporter = createTransporter();

  // Email options
  const mailOptions = {
    from: process.env.AUTH_EMAIL_P,
    to: email,
    subject: "Login otp to CURESLEEP SOLUTIONS",
    html: `<div style="background: #121212 ; text-align: center;">
     <h1 style="font-size: 45px; font-weight: bold; background: #121212; color:#fff;padding:10px 0px; " >CURESLEEP SOLUTIONS</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p style="color: #333; font-size: 17px; margin-bottom: 5px;">Dear  <span>${name},</span> </p> 
       
    <p style="color: #333; font-size: 17px; margin-bottom: 5px;"> This is code to verify and login </p>
       <div style="color: #121212;  display: inline-block; padding: 10px 20px; border-radius: 4px; font-size: 35px; letter-spacing: 1.5px;">
                <strong>${verificationToken}</strong>
            </div>
     <p style="color: #333; font-size: 17px; margin-bottom: 5px;"> This OTP is valid for 10 minutes.</p>
    <h5 style="color: #333; font-size: 17px; margin-bottom: 5px;">Best regards,<br>CURESLEEP SOLUTIONS Team</h5>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 13px;">
    <h6>This is an automated message, please do not reply to this email.</h6>
  </div>`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

const sendWelcomeEmail = async (email, name) => {
  // Configure the email transport using nodemailer
  const transporter = createTransporter();

  // Email options
  const mailOptions = {
    from: process.env.AUTH_EMAIL_P,
    to: email,
    subject: "Welcome to CURESLEEP SOLUTIONS",
    html: `<div style="background: #121212 ; text-align: center;">
     <h1 style="font-size: 45px; font-weight: bold; background: #121212; color:#fff;padding:10px 0px; " >CURESLEEP SOLUTIONS</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p style="font-size: 17px;" >Hello   ${name},  </p> 
        
    <p style="font-size: 17px;">Your account has successfully been verified, please use the link below to access the dashboard.</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${process.env.CLIENT_URL}/dashboard/user" style="font-size: 30px; background: #121212; color:#fff;padding:10px 30px;border-radius:5px;text-decoration:none">Dashboard</a>
    </div>
     
    <h5 style="font-size: 17px;">Best regards,<br>CURESLEEP SOLUTIONS Team</h5>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 13px;">
    <h6>This is an automated message, please do not reply to this email.</h6>
  </div>`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

const sendLoginEmail = async (email, name, time, date) => {
  try {
    // Configure the email transport using nodemailer

    const transporter = createTransporter();

    // Email options
    const mailOptions = {
      from: process.env.AUTH_EMAIL_P,
      to: email,
      subject: "CURESLEEP SOLUTIONS Alert",
      html: `<div style="background: #121212; padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0;">CURESLEEP SOLUTIONS</h1>
            </div>
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                <h5 style="font-size:20px">Dear  ${name},</h5>
                <p style="font-size:17px">You have  successfully logged in to CURESLEEP SOLUTIONS  at <strong>${time}</strong> on <strong>${date}</strong>.</p>
                <p style="font-size:17px">If you do not recognize this login attempt, please immediately Login to our Website  </strong> to block the  services.</p>
                <p style="font-size:17px">Please note that CURESLEEP SOLUTIONS will never ask for any confidential information by calling from any number including its official helpline numbers, through emails or websites! Please do not share your confidential details such as  CVV, User Name, Password, OTP etc.</p>
                <p>In case of any complaint, you may contact us through:</p>
                <ul>
                    <li style="font-size:17px">Email: <a href="mailto:support@otcix.com">support@otcix.com</a></li>
                    <li style="font-size:17px">Phone: <a href="tel:+442071775747">+44 2071775747</a></li>
                    <li style="font-size:17px">Websites: <a href="https://www.otcix.com/contact/">https://www.otcix.com/contact/</a></li>
                </ul>
            </div>
            <div style="text-align: center; margin-top: 20px; color: #888; font-size: 13px;">
                <p>This is an automated message, please do not reply to this email.</p>
            </div>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log("Error occurred:", error.message);
      }
      console.log("Message sent: %s", info.messageId);
    });
  } catch (error) {
    console.error("Error sending email:", error); // Log the error
    throw new Error("Failed to send email"); // Optional: Throw an error to propagate it further
  }
};

const forgotPasswordEmail = async (email, name, resetToken) => {
  // Configure the email transport using nodemailer
  const transporter = createTransporter();

  // Email options
  const mailOptions = {
    from: process.env.AUTH_EMAIL_P,
    to: email,
    subject: "Forgot Password",
    html: `<div style="background: #121212; padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">CURESLEEP SOLUTIONS</h1>
</div>
<div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <h5 style="font-size:20px">Dear  ${name}, </h5>
    <p style="font-size:17px">CURESLEEP SOLUTIONS recently received a request for a forgotten password.</p>
    <p style="font-size:17px">To change your CURESLEEP SOLUTIONS password, please click on below link</p>
    <div style="text-align: center; margin: 30px 0;">
        <a href="${resetToken}" style="font-size: 20px; font-weight: bold; background: #121212; color: #fff; padding: 10px 30px; border-radius: 5px; text-decoration: none;">Reset your password</a>
    </div>
     
    <p style="font-size:17px">The Link will expire in 1 hour for security reasons.</p>
    <p style="font-size:17px">If you did not request this change, you do not need to do anything.</p>
    <h5 style="font-size:17px">Best regards,<br>CURESLEEP SOLUTIONS Team</h5>
     
</div>
<div style="text-align: center; margin-top: 20px; color: #888; font-size: 13px;">
    <p>This is an automated message, please do not reply to this email.</p>
</div>
`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

const resetPasswordEmail = async (email, name, time, date) => {
  // Configure the email transport using nodemailer
  const transporter = createTransporter();

  // Email options
  const mailOptions = {
    from: process.env.AUTH_EMAIL_P,
    to: email,
    subject: "Reset Password",
    html: `<div style="background: #121212; padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">CURESLEEP SOLUTIONS</h1>
</div>
<div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <h5 style="font-size:20px">Dear ${name}, </h5>
    <p style="font-size:17px">You have successfully changed  your password  at <strong>${time}</strong> on <strong>${date}</strong>.</p>
    <p style="font-size:17px">If you do not recognize this  attempt, please immediately  contact us to block the  services.</p>
    <p style="font-size:17px">Please note that CURESLEEP SOLUTIONS will never ask for any confidential information by calling from any number including its official helpline numbers, through emails or websites! Please do not share your confidential details such as  CVV, User Name, Password, OTP etc.</p>
    <p>In case of any complaint, you may contact us through:</p>
     <ul>
                    <li style="font-size:17px">Email: <a href="mailto:support@otcix.com">support@otcix.com</a></li>
                    <li style="font-size:17px">Phone: <a href="tel:+442071775747">+44 2071775747</a></li>
                    <li style="font-size:17px">Websites: <a href="https://www.otcix.com/contact/">https://www.otcix.com/contact/</a></li>
                </ul>
</div>
<div style="text-align: center; margin-top: 20px; color: #888; font-size: 13px;">
    <p>This is an automated message, please do not reply to this email.</p>
</div>
`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = {
  registerController,
  loginController,
  forgotPasswordController,
  verifyEmailController,
  logoutController,
  resetPasswordController,
  otpSendController,
  changeEmailController,

  getAlluserController,
  getSingleUserController,
  googleAuthController,
};
