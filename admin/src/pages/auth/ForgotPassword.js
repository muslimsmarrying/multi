import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import VerifyLogo from "../../assets/images/logo.png";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/admin/forgot-password-admin`,
        { username }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setEmailSent(true);
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

                {/* Conditional rendering based on email sent state */}
                {!emailSent ? (
                  <>
                    <h2 className="mt-3 text-center text-coomon-color">
                      Reset Password
                    </h2>
                    <p className="mt-3 text-center text-coomon-color">
                      Please provide your username to send you a verification
                      code.
                    </p>
                    <form onSubmit={handleForgotPassword}>
                      <div className="auth-inp-main">
                        <label className="text-coomon-color">Username</label>
                        <input
                          type="text"
                          className="auth-inp"
                          placeholder="Your Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </div>
                      <div className="my-3">
                        <button
                          type="submit"
                          className="login-sub login-sub-c w-100"
                          disabled={loading}
                        >
                          {loading ? "Sending..." : "Send Code"}
                        </button>
                      </div>
                      <div className="mb-3 text-center">
                        <Link to="/" className="text-center text-coomon-color">
                          Back to Login
                        </Link>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="text-center">
                    <h2 className="mt-3 text-center text-coomon-color">
                      Email Sent!
                    </h2>
                    <p className="mt-3 text-center text-coomon-color">
                      A verification link has been sent to mail. Please check
                      your inbox to reset your password.
                    </p>
                    <div className="my-5">
                      <Link
                        to="/"
                        className="login-sub login-sub-c w-100 d-block"
                      >
                        Back to Login
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
