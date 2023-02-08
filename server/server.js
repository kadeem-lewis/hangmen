const http = require("http");

const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const Room = require("./Room");
const User = require("./User");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});
//Functions
function createRoomCode() {
  activeRooms.push(new Room());
  return code;
}
const users = [];
const messages = [];
const activeRooms = [
  {
    code: "1234",
    users: [],
    size: "",
  },
];

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("register", (username, userId) => {
    const user = new User(username, userId, socket.id);
    users.push(user);
  });

  socket.on("request-room-code", () => {
    const room = new Room();
    activeRooms.push(room);
    io.emit("create-room", room.code);
  });
  socket.on("join-room", (roomCode, cb) => {
    let foundRoom = activeRooms.find((room) => room.code === roomCode);
    if (foundRoom) {
      currentUser = users.find((user) => user.socketId === socket.id);
      socket.join(roomCode);
      foundRoom.addPlayer(currentUser);
      socket.emit("new-player", currentUser);

      console.log(users);
      console.log(currentUser);
      console.log(`user joined room ${roomCode}`);
    } else {
      cb("Game not found");
    }
  });
  socket.on("send-message", (data) => {
    messages.push(data);
    console.log(messages);
    socket.emit("receive-message", messages);
  });
  socket.on("disconnect", () => {
    console.log("client disconnected");
  });
});

server.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.SERVER_URL}`)
);
