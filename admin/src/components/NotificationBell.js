import { Badge, notification } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNotifications } from "../hooks/useNotifications";

import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

const NotificationBell = () => {
  const [audioAllowed, setAudioAllowed] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch notifications on component mount
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("/user/notifications");
        setUnreadCount(response.data.unreadCount);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  // Handle socket notifications
  useNotifications((data) => {
    setUnreadCount((prev) => prev + 1);

    // Show toast popup
    api.info({
      message: data.title || "New Notification",
      description: data.message || "",
      placement: "topRight",
      duration: 15,
    });
  });

  const handleBellClick = async () => {
    // Redirect to notifications page
    navigate("/dashboard/admin/notifications");

    // Mark all notifications as read
    try {
      await axios.patch("/api/notifications/mark-all-read");
      setUnreadCount(0);
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  return (
    <>
      {contextHolder}
      <div style={{ cursor: "pointer" }} onClick={handleBellClick}>
        <Badge
          count={2}
          style={{
            backgroundColor: "#202330",
            color: "#fff",
            fontWeight: "bold",
            fontSize: 11,
            padding: "0 6px",
          }}
        >
          <BellOutlined className="notification-icon" />
        </Badge>
      </div>
    </>
  );
};

export default NotificationBell;
