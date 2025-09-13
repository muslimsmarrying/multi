import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import axios from "axios";
import AdminNav from "./AdminNav";

const Activities = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allActivities, setAllActivities] = useState({ users: [], admins: [] });
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [activeType, setActiveType] = useState("users");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(100);

  const token = localStorage.getItem("admintoken");
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/admin/activities`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (data?.success) {
          setAllActivities({
            users: data.data.userActivities,
            admins: data.data.adminActivities,
          });
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  useEffect(() => {
    const dataToSearch = allActivities[activeType] || [];
    const query = searchTerm.toLowerCase();
    const result = dataToSearch.filter((item) => {
      const name = item?.userId?.firstName || item?.adminId?.name || "";
      const email = item?.userId?.email || item?.adminId?.email || "";
      const activity = item.activity || "";
      const description = item.description || "";
      const ip = item.ipAddress || "";
      const location = item.location || "";
      const device = JSON.stringify(item.deviceInfo || "");
      const date = new Date(item.createdAt).toLocaleString();

      return (
        name.toLowerCase().includes(query) ||
        email.toLowerCase().includes(query) ||
        activity.toLowerCase().includes(query) ||
        description.toLowerCase().includes(query) ||
        ip.toLowerCase().includes(query) ||
        location.toLowerCase().includes(query) ||
        device.toLowerCase().includes(query) ||
        date.toLowerCase().includes(query)
      );
    });
    setFiltered(result);
    setPage(1);
  }, [searchTerm, allActivities, activeType]);

  const paginatedData = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="wrapper d-flex align-items-stretch">
      {loading && <Loader />}
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div id="content" className="px-2 ">
        <button
          type="button"
          id="openSidebar"
          onClick={toggleSidebar}
          className="bars-btn"
        >
          <FaBarsStaggered />
        </button>
        <AdminNav />
        <h3 className="b-clr">Activities</h3>

        <div className="search-add-main d-flex justify-content-between align-items-center">
          <div className="search-main">
            <input
              type="text"
              className="search-inp"
              placeholder="Search by name, email, activity, etc."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="search-icon">
              <IoSearchOutline />
            </div>
          </div>
          <div className="d-flex gap-2">
            <button
              className={`btn ${
                activeType === "users" ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setActiveType("users")}
            >
              User Activities
            </button>
            <button
              className={`btn ${
                activeType === "admins" ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setActiveType("admins")}
            >
              Admin Activities
            </button>
          </div>
        </div>

        <div className="tbl-main mt-4">
          <table className="simple-table">
            <thead>
              <tr>
                <th>DATE</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ACTIVITY</th>
                <th>DESCRIPTION</th>
                <th>IP ADDRESS</th>
                <th>LOCATION</th>
                <th>DEVICE</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item) => {
                  const name = item?.userId?.name || item?.adminId?.name || "-";
                  const email =
                    item?.userId?.email || item?.adminId?.email || "-";

                  return (
                    <tr key={item._id}>
                      <td>{new Date(item.createdAt).toLocaleString()}</td>
                      <td>{name}</td>
                      <td>{email}</td>
                      <td>{item.activity}</td>
                      <td>{item.description}</td>
                      <td>{item.ipAddress}</td>
                      <td>{item.location}</td>
                      <td>
                        {item.deviceInfo
                          ? Object.entries(item.deviceInfo)
                              .filter(
                                ([_, value]) =>
                                  value && value.toLowerCase() !== "unknown"
                              )
                              .map(([key, value]) => `${key}: ${value}`)
                              .join(", ")
                          : "-"}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8">No activities found</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="d-flex justify-content-center mt-3">
            {Array.from(
              { length: Math.ceil(filtered.length / pageSize) },
              (_, i) => (
                <button
                  key={i}
                  className={`btn mx-1 ${
                    page === i + 1 ? "btn-primary" : "btn-outline-primary"
                  }`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
