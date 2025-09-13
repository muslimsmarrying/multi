import { createContext, useContext, useEffect } from "react";
import socket from "../utils/socket";

const SocketContext = createContext(null);

export const SocketProvider = ({ userId, children }) => {
  useEffect(() => {
    if (userId) {
      socket.connect();
      socket.emit("joinUserRoom", userId);
    }

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
