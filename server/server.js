const http = require("http");

const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

const server = http.createServer(app);
const PORT = process.env.SERVER_PORT || 3005;
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
io.on("connection", (socket) => {
  console("New connection");
});
server.listen(PORT, () =>
  console.log(`Server running on https://localhost:${PORT}`)
);
