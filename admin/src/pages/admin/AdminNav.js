import React from "react";
import { Menu, Dropdown, Avatar } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import NotificationBell from "../../components/NotificationBell";
const AdminNav = ({ title }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Send POST request to the server to log out
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/logout`
      );

      if (res.data.success) {
        localStorage.removeItem("admintoken");
        localStorage.removeItem("adminauther");

        // Show a logout notification
        toast.info("Logged out successfully");

        // Redirect to the login page
        navigate("/");
      } else {
        toast.error("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="1" icon={<SettingOutlined />}>
        <Link to={"/dashboard/admin/profile"}>Profile</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />} onClick={handleLogout}>
        {/* Use an onClick here instead of Link */}
        <span>Logout</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div
        className="d-flex align-items-center justify-content-between"
        style={{ padding: " 10px" }}
      >
        <h3 className="b-clr">{title}</h3>
        <div className="d-flex align-items-center gap-3">
          <NotificationBell />
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar icon={<UserOutlined />} />
              <span className="profile-name" style={{ marginLeft: 8 }}>
                Admin
              </span>
            </div>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default AdminNav;
