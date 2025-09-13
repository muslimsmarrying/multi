import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import SignLogo from "../../assets/images/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../../components/Loader";
const Login = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [otpSecVisible, setOtpSecVisible] = useState(false); // Initially false for login form
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes timer
  const [isExpired, setIsExpired] = useState(false);

  const OTP_TIMER_KEY = "otp_timer_start";

  useEffect(() => {
    if (otpSecVisible) {
      const startTime = localStorage.getItem(OTP_TIMER_KEY);
      if (startTime) {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const remaining = 600 - elapsed;
        if (remaining > 0) {
          setTimeLeft(remaining);
          setIsExpired(false);
        } else {
          setTimeLeft(0);
          setIsExpired(true);
          toast.error("OTP expired! Please request a new code.");
          localStorage.removeItem(OTP_TIMER_KEY);
        }
      }
    }
  }, [otpSecVisible]);

  useEffect(() => {
    if (otpSecVisible && timeLeft > 0 && !isExpired) {
      const timerId = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsExpired(true);
            localStorage.removeItem(OTP_TIMER_KEY);
            toast.error("OTP expired! Please request a new code.");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [otpSecVisible, timeLeft, isExpired]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      toast.error("Username and Password are required!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/admin/admin-login`,
        { username, password }
      );

      if (res.data.success) {
        setOtpSecVisible(true);
        localStorage.setItem(OTP_TIMER_KEY, Date.now());
        toast.success("OTP sent to your email!");
      } else {
        toast.error(res.data.message || "Login failed.");
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

  const handleChange = (index, value) => {
    const newCode = [...code];

    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const newCode = pasteData.split("");
    setCode(newCode);
    inputRefs.current[newCode.length - 1]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalCode = code.join("");
    if (finalCode.length !== 6 || isExpired) {
      toast.error("Please enter a valid 6-digit code.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/admin/admin-verify-login`,
        { code: finalCode }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.setItem("admintoken", res.data.token);

        localStorage.setItem(
          "adminauthor",
          JSON.stringify({ admin: res.data.subAdmin, token: res.data.token })
        );

        localStorage.removeItem(OTP_TIMER_KEY);
        navigate("/dashboard/admin");
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

  const handleResend = async () => {
    if (!username) {
      toast.error("username is required.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_API}/api/v1/admin/admin-login-otp-again`,
        { username }
      );
      toast.success("New OTP sent to your email!");
      setTimeLeft(600);
      setIsExpired(false);
      setCode(["", "", "", "", "", ""]);
      localStorage.setItem(OTP_TIMER_KEY, Date.now());
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

  return (
    <>
      <Navbar />
      {loading && <Loader />}
      {otpSecVisible ? (
        <div className="mt-top m-h-75 d-flex align-items-center justify-content-center mb-5">
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="verify-card">
                  <div className="text-center">
                    <img src={SignLogo} alt="Logo" />
                  </div>
                  <h2 className="mt-3 text-center text-coomon-color">
                    Verification code has been sent to your Mail.
                  </h2>
                  <p className="common-text d-clr text-center pb-5">
                    Please enter the 6-digit code from your email. It expires in{" "}
                    <span className="text-coomon-color">
                      {formatTime(timeLeft)}
                    </span>
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="d-flex justify-content-between">
                      {code.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => (inputRefs.current[index] = el)}
                          type="text" // Use text for better paste support
                          value={digit}
                          onChange={(e) => handleChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          onPaste={handlePaste}
                          className="pinCode-inp text-center"
                          maxLength="1"
                          disabled={isExpired}
                          inputMode="numeric" // Mobile keyboard optimization
                        />
                      ))}
                    </div>
                    <div className="my-3">
                      <button
                        type="submit"
                        className="login-sub login-sub-c"
                        disabled={code.includes("") || isExpired}
                      >
                        {isExpired ? "OTP Expired" : "Verify"}
                      </button>
                    </div>
                  </form>
                  <div className="text-center">
                    <button
                      className="fs-5 text-coomon-color bg-transparent border-0"
                      onClick={handleResend}
                    >
                      Resend OTP
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-top">
          <div className="reg-main">
            <div className="reg-sub">
              <div className="reg-right">
                <img src={SignLogo} alt="Logo" />
                <form onSubmit={handleSubmitLogin}>
                  <div className="auth-inp-main position-relative">
                    <label className="form-label">Username*</label>
                    <input
                      type="text"
                      className="auth-inp"
                      value={username}
                      onChange={(e) => setUsername(e.target.value.trim())}
                      required
                      autoComplete="username"
                    />
                  </div>
                  <div className="auth-inp-main position-relative">
                    <label className="form-label">Password*</label>
                    <input
                      type={passwordVisible ? "text" : "password"}
                      className="auth-inp"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                    />
                    <span
                      className="toggle-btn"
                      id="togglePassword"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                  <div className="d-flex align-items-center">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                    />
                    <label htmlFor="rememberMe" className="form-label ms-2">
                      Remember Me
                    </label>
                  </div>
                  <div className="text-center login-btns-sub mt-3 mb-4">
                    <button type="submit" className="login-sub login-sub-c">
                      LOGIN
                    </button>
                  </div>
                  <p className="text-center form-label">
                    <Link className="text-coomon-color" to="/forgot-password">
                      Forgotten your login details ?
                    </Link>
                  </p>
                </form>
              </div>
              <div className="login-left px-5">
                <p className="text-white login-wel">WELCOME TO</p>
                <h3 className="text-white login-t text-uppercase">
                  Cure Sleep Solutions
                </h3>
                <p className="text-white login-wel">
                  Login to Access Admin Dashboard
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
