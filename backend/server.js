const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

// configure env
dotenv.config();

// database config
const connectDB = require("./config/db");

// route imports
const authRoutes = require("./routes/authRoute");
const transactionRoutes = require("./routes/transactionRoutes");
const adminRoutes = require("./routes/adminRoute");
const chipsRoutes = require("./routes/chipsRoute");

// init express
const app = express();
connectDB();
// create HTTP server
const server = http.createServer(app);

// initialize socket.io
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Socket.IO logic
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Expect client to send their userId after connecting
  socket.on("joinUserRoom", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their personal room.`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// store io instance globally if needed elsewhere
app.set("io", io);

// middlewares
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/transaction", transactionRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/chips", chipsRoutes);

app.get("/", (req, res) => {
  res.send("Socket.IO Backend Running");
});

// run server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
