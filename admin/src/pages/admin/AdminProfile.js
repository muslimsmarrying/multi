import React, { useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import AdminNav from "./AdminNav";
import Sidebar from "./Sidebar";
import { Card } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const AdminProfile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    id: "",
  });

  const [loading, setLoading] = useState(false);

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { id, name, email, password } = formData;

    // Validate if the email contains "@"
    if (!email.includes("@")) {
      toast.error("Invalid Email! Please include '@' in your email.");
      return;
    }

    // Check if the email is empty
    if (email === "") {
      toast.error("Email is required!");
      return;
    }

    setLoading(true); // Show loader while request is being processed

    const payload = { name, email, id };
    if (password) {
      payload.password = password;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/update-profile/${id}`,
        payload
      );

      if (response.data.success) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false); // Hide loader after request is completed
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      {loading && <Loader />}
      <div className="wrapper d-flex align-items-stretch">
        <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        {/* Page Content */}
        <div id="content" className="px-2">
          <button
            type="button"
            id="openSidebar"
            onClick={toggleSidebar}
            className="bars-btn"
          >
            <FaBarsStaggered />
          </button>
          <AdminNav />
          <div className="p-3">
            <Card style={{ maxWidth: 800, margin: "0 auto", marginTop: 50 }}>
              <h3 className="text-center">Update Profile</h3>
              <form onSubmit={handleSubmit}>
                {/* Name Input */}
                <div className="form-group mb-3">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    required
                    className="form-control"
                  />
                </div>

                {/* Email Input */}
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                    className="form-control"
                  />
                </div>

                {/* New Password Input */}
                <div className="form-group mb-3">
                  <label htmlFor="password">New Password (optional)</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter new password"
                    className="form-control"
                  />
                </div>

                {/* Submit Button */}
                <div className="form-group">
                  <button className="add-user-btn" type="submit">
                    Update Profile
                  </button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
