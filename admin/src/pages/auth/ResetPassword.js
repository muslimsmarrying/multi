import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import VerifyLogo from "../../assets/images/logo.png";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaCheck, FaTimes } from "react-icons/fa";
import Loader from "../../components/Loader";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  // Password validation rules
  const passwordValidations = [
    {
      id: "length",
      message: "Must be at least 15 characters long",
      isValid: password.length >= 15,
    },
    {
      id: "uppercase",
      message: "Must contain at least one uppercase letter",
      isValid: /[A-Z]/.test(password),
    },
    {
      id: "lowercase",
      message: "Must contain at least one lowercase letter",
      isValid: /[a-z]/.test(password),
    },
    {
      id: "number",
      message: "Must contain at least one number",
      isValid: /[0-9]/.test(password),
    },
    {
      id: "special",
      message: "Must contain at least one special character",
      isValid: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];

  // Confirm password validation
  const isPasswordMatch = password === confirmPassword;

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Check if all validations are met
    const isPasswordValid = passwordValidations.every((rule) => rule.isValid);
    if (!isPasswordValid || !isPasswordMatch) {
      toast.error("Please fix the password requirements.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/admin/reset-password-admin/${token}`,
        { password }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <>
      <Navbar />
      {loading && <Loader />}
      <div className="mt-top m-h-75 d-flex align-items-center justify-content-center mb-5">
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="verify-card">
                <div className="text-center">
                  <img src={VerifyLogo} alt="Logo" />
                </div>
                <h2 className="mt-3 text-center text-coomon-color">
                  Reset Password
                </h2>
                <p className="mt-3 text-center text-coomon-color">
                  Enter your new password below to reset it.
                </p>
                <form onSubmit={handleResetPassword}>
                  {/* New Password Field */}
                  <div className="auth-inp-main">
                    <label className="text-coomon-color">New Password</label>
                    <div className="password-field">
                      <input
                        type={passwordVisible ? "text" : "password"}
                        className="auth-inp"
                        placeholder="Enter New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <span
                        className="toggle-btn"
                        onClick={togglePasswordVisibility}
                      >
                        {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                      </span>
                    </div>
                    {/* Password Validation Feedback */}
                    <div className="mt-2">
                      {passwordValidations.map((rule) => (
                        <div
                          key={rule.id}
                          className={`d-flex align-items-center small ${
                            rule.isValid ? "text-success" : "text-danger"
                          }`}
                        >
                          {rule.isValid ? <FaCheck /> : <FaTimes />}
                          <span className="ms-2">{rule.message}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="auth-inp-main mt-3">
                    <label className="text-coomon-color">
                      Confirm New Password
                    </label>
                    <div className="password-field">
                      <input
                        type={confirmPasswordVisible ? "text" : "password"}
                        className="auth-inp"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <span
                        className="toggle-btn"
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        {confirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                      </span>
                    </div>
                    {/* Password Match Feedback */}
                    <div className="mt-2">
                      <div
                        className={`d-flex align-items-center small ${
                          isPasswordMatch ? "text-success" : "text-danger"
                        }`}
                      >
                        {isPasswordMatch ? <FaCheck /> : <FaTimes />}
                        <span className="ms-2">Passwords must match</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="my-3">
                    <button
                      type="submit"
                      className="sub-btn-b w-100"
                      disabled={loading}
                    >
                      {loading ? "Resetting..." : "Reset Password"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
