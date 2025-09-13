import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_API, {
  autoConnect: false, // we'll connect manually after login
  transports: ["websocket"],
});

export default socket;
