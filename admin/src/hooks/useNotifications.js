import { useEffect } from "react";
import { useSocket } from "../Context/SocketContext";

export const useNotifications = (onReceive) => {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    const handler = (data) => {
      onReceive(data);
    };

    socket.on("receiveNotification", handler);
    return () => {
      socket.off("receiveNotification", handler);
    };
  }, [socket, onReceive]);
};
