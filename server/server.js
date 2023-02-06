const http = require("http");

const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

const people = {};
const messages = [];
const activeRooms = ["1234", "1A2B", "ABCD"];

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("register", (username) => {
    console.log("register event received");
    people[socket.id] = username;
    console.log(people);
  });

  socket.on("join-room", (room, res) => {
    if (activeRooms.includes(room)) {
      socket.join(room);
      console.log(`user joined room ${room}`);
    } else {
      res("Game not found");
    }
  });
  socket.on("send-message", (data) => {
    messages.push(data);
    console.log(messages);
    socket.emit("receive-message", messages);
  });
  socket.on("create-room", () => {});
  socket.on("disconnect", () => {
    console.log("client disconnected");
  });
});

server.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.SERVER_URL}`)
);
