const http = require("http");

const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

const server = http.createServer(app);
// const PORT = process.env.SERVER_PORT || 3000;
// const C_PORT = process.env.CLIENT_PORT;
const io = new Server(server, {
  cors: {
    origin: `http://localhost:3000`,
  },
});
io.on("connection", (socket) => {
  console.log(socket.id);
  io.on("register-user", () => {
    //
  });
  io.on("join-room", () => {});
  io.on("create-room", () => {});
});

server.listen(3005, () =>
  console.log(`Server running on https://localhost:3005`)
);
