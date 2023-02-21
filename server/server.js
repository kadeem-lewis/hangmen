const http = require("http");

const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const Room = require("./Room");
const User = require("./User");
const Message = require("./Message");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

const users = {};
const messages = {};
const activeRooms = {};

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("register", (username, userId) => {
    users[socket.id] = new User(username, userId);
    // const user = new User(username, userId, socket.id);
    // users.push(user);
  });

  socket.on("request-room-code", () => {
    const room = new Room();
    activeRooms[room.code] = room;
    // activeRooms.push(room);
    io.emit("create-room", room.code);
  });
  socket.on("join-room", (roomCode, cb) => {
    //let foundRoom = activeRooms.find((room) => room.code === roomCode);
    if (activeRooms[roomCode]) {
      //currentUser = users.find((user) => user.socketId === socket.id);
      socket.join(roomCode);
      activeRooms[roomCode].addPlayer(users[socket.id]);
      //not emitting to everyone
      io.to(roomCode).emit("new-player", users[socket.id]);

      console.log(`user joined room ${roomCode}`);
      console.log(activeRooms[roomCode]);
    } else {
      cb("Game not found");
    }

    socket.on("send-message", (id, text) => {
      const message = new Message(sender, text);
      //TODO: add new message to the message array
      console.log("messages" + messages);
      //not emitting to everyone
      io.to(roomCode).emit("receive-message", {
        id: id,
        sender: users[socket.id].username,
        text: text,
      });
    });
  });
  socket.on("leave-room", () => {
    delete activeRooms[roomCode];
    socket.leave(roomCode);
  });
  socket.on("disconnect", () => {
    console.log("client disconnected");
  });
});
server.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.SERVER_URL}`)
);
