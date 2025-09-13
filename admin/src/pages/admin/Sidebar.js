import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import "./sidebar.css";
import SignLogo from "../../assets/images/logo.png";
import { MdDashboardCustomize } from "react-icons/md";
import { LuActivity } from "react-icons/lu";
import { GoPlus } from "react-icons/go";
import { BsBagCheckFill } from "react-icons/bs";
import { FaMicrochip, FaUsers } from "react-icons/fa6";
const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const location = useLocation(); // to get the current URL path
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const authDataString = localStorage.getItem("adminauthor");

  const authData = JSON.parse(authDataString);
  const role = authData?.admin?.role;

  return (
    <nav id="sidebar" className={sidebarOpen ? "active" : ""}>
      <div className="custom-menu">
        <button type="button" id="closeSidebar" onClick={toggleSidebar}>
          <IoClose />
        </button>
      </div>

      <div className="py-2">
        <div className="my-2">
          <Link className="d-flex justify-content-center" to="/dashboard/admin">
            <img className="sidebar-logo" src={SignLogo} alt="logo" />
          </Link>
        </div>

        <ul className="list-unstyled components mb-5">
          <li
            className={
              activePath === "/dashboard/admin" ? "active-sidebar" : ""
            }
          >
            <Link to="/dashboard/admin">
              <MdDashboardCustomize className="me-1" /> Dashboard
            </Link>
          </li>

          <li
            className={
              activePath === "/dashboard/admin/users" ? "active-sidebar" : ""
            }
          >
            <Link to="/dashboard/admin/users">
              <FaUsers className="me-1" /> Users
            </Link>
          </li>

          <li
            className={
              activePath === "/dashboard/admin/active-chips"
                ? "active-sidebar"
                : ""
            }
          >
            <Link to="/dashboard/admin/active-chips">
              <FaMicrochip className="me-1" /> Active Chips
            </Link>
          </li>
          <li
            className={
              activePath === "/dashboard/admin/orders" ? "active-sidebar" : ""
            }
          >
            <Link to="/dashboard/admin/orders">
              <BsBagCheckFill className="me-1" /> Orders
            </Link>
          </li>
          {role === "super-admin" ? (
            <>
              <li
                className={
                  activePath === "/dashboard/admin/sub-admins"
                    ? "active-sidebar"
                    : ""
                }
              >
                <Link to="/dashboard/admin/sub-admins">
                  <GoPlus className="me-1" /> Admin Users
                </Link>
              </li>

              <li
                className={
                  activePath === "/dashboard/admin/activities"
                    ? "active-sidebar"
                    : ""
                }
              >
                <Link to="/dashboard/admin/activities">
                  <LuActivity className="me-1" /> Activities
                </Link>
              </li>
            </>
          ) : (
            ""
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
