import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Loader from "../../components/Loader";
import AdminNav from "./AdminNav";
import axios from "axios";
import { toast } from "react-toastify";
import { DatePicker, Select } from "antd";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;
const { Option } = Select;

const AdminNotifications = () => {
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSpaceActive, setIsSpaceActive] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [dateFilter, setDateFilter] = useState("all");
  const [customRange, setCustomRange] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);

  const token = localStorage.getItem("token");

  const handleSpaceToggle = () => setIsSpaceActive(!isSpaceActive);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/user/notifications`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Handle the API response structure properly
      const notificationsData = data?.notifications || [];
      setNotifications(notificationsData);
      setFilteredNotifications(notificationsData); // Initialize filtered with all notifications
    } catch (error) {
      toast.error("Failed to fetch notifications");
      setNotifications([]);
      setFilteredNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const applyDateFilter = () => {
    if (!Array.isArray(notifications)) {
      setFilteredNotifications([]);
      return;
    }

    let filtered = [...notifications];
    const now = dayjs();

    if (dateFilter !== "all") {
      let startDate;

      switch (dateFilter) {
        case "today":
          startDate = now.startOf("day");
          break;
        case "week":
          startDate = now.subtract(7, "day");
          break;
        case "month":
          startDate = now.startOf("month");
          break;
        case "year":
          startDate = now.startOf("year");
          break;
        case "custom":
          // Add null/empty array check here
          if (!customRange || customRange.length !== 2) {
            setFilteredNotifications(filtered);
            return;
          }

          const [start, end] = customRange;
          filtered = filtered.filter((item) => {
            const createdAt = dayjs(item.createdAt);
            return (
              createdAt.isAfter(dayjs(start).startOf("day")) &&
              createdAt.isBefore(dayjs(end).endOf("day"))
            );
          });
          setFilteredNotifications(filtered);
          return;
        default:
          break;
      }

      if (dateFilter !== "custom") {
        filtered = filtered.filter((item) =>
          dayjs(item.createdAt).isAfter(startDate)
        );
      }
    }

    setFilteredNotifications(filtered);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    applyDateFilter();
  }, [notifications, dateFilter, customRange]);

  // Pagination
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentItems = filteredNotifications.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredNotifications.length / perPage);

  return (
    <>
      {loading && <Loader />}
      <Sidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        onSpaceToggle={handleSpaceToggle}
        isSpaceActive={isSpaceActive}
      />
      <div
        className={`dashboard-main ${sidebarOpen ? "shifted" : ""}  ${
          isSpaceActive ? "freeSpaceDash" : "dashboard-main"
        }`}
      >
        <AdminNav title={"Notifications"} />
        <div className="dashboard-content">
          <div className="filters-main">
            <div className="d-flex align-items-center gap-5">
              <div className="other-filter-sub">
                <label className="bc-clr">Date Filter</label>
                <Select
                  value={dateFilter}
                  onChange={setDateFilter}
                  style={{ width: "200px" }}
                >
                  <Option value="all">All</Option>
                  <Option value="today">Today</Option>
                  <Option value="week">Last 7 Days</Option>
                  <Option value="month">This Month</Option>
                  <Option value="year">This Year</Option>
                  <Option value="custom">Custom</Option>
                </Select>
              </div>

              {dateFilter === "custom" && (
                <div className="other-filter-sub">
                  <label className="bc-clr">Select Range</label>
                  <RangePicker
                    value={customRange}
                    onChange={(dates) => setCustomRange(dates || [])} // Handle null case
                    style={{ height: "40px" }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="notification-list mt-4">
            {currentItems.length === 0 ? (
              <p>No notifications found.</p>
            ) : (
              currentItems.map((note) => (
                <div
                  key={note._id}
                  className={`notification-item p-3 mb-3 bg-white rounded shadow-sm ${
                    !note.isRead ? "unread-notification" : ""
                  }`}
                >
                  <div className="d-flex justify-content-between">
                    <h4 className="fw-bold mb-1">{note.title}</h4>
                    <span className="text-secondary small">
                      {dayjs(note.createdAt).format("DD MMM YYYY, hh:mm A")}
                    </span>
                  </div>

                  <p className="text-muted mb-0">{note.message}</p>
                </div>
              ))
            )}
          </div>

          {totalPages > 1 && (
            <div className="pagination-controls mt-3 d-flex justify-content-center">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`btn mx-1 ${
                    currentPage === i + 1
                      ? "btn-primary"
                      : "btn-outline-primary"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminNotifications;
