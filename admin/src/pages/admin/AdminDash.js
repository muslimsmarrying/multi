import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "./Sidebar";
import { FaBarsStaggered, FaMicrochip } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";
import { ImCart } from "react-icons/im";
import axios from "axios";

import AdminNav from "./AdminNav";

import { formatNumber } from "../../utils/formateNum";

const AdminDash = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("admintoken");

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Fetch all users
  const getAllUsersData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/m-users`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data?.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Load users & transactions on mount
  useEffect(() => {
    getAllUsersData();
  }, [token]);

  // Filter users by search term

  return (
    <div className="wrapper d-flex align-items-stretch">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

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

        {/* Top Summary Boxes */}
        <div className="mt-3">
          <div className="boxes-main">
            <Link className="box-btn">
              <LuUsers className="box-btn-icon" />
              <h4 className="box-title">{formatNumber(users.length)}</h4>
              <p className="box-text">Total Users</p>
            </Link>

            <Link className="box-btn">
              <ImCart className="box-btn-icon" />
              <h4 className="box-title"> 798</h4>
              <p className="box-text">Total Orders</p>
            </Link>

            <Link className="box-btn">
              <FaMicrochip className="box-btn-icon" />
              <h4 className="box-title"> 7888</h4>
              <p className="box-text">Active Chips</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
