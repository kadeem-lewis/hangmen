import http from "http";

import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import { Room } from "./Room";
import { User } from "./User";

const app = express();

app.use(cors());

app.get("/health", (req, res) => {
  res.status(200).send("Server is running");
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});
interface Users {
  [key: string]: User;
}

interface Messages {
  // You can replace 'any' with a specific type if you have one
  [key: string]: any;
}

interface ActiveRooms {
  [key: string]: Room;
}
const users: Users = {};
const messages: Messages = {};
const activeRooms: ActiveRooms = {};

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("register", (username, userId) => {
    users[socket.id] = new User(username, userId);
  });

  socket.on("request-room-code", () => {
    const room = new Room();
    activeRooms[room.code] = room;
    io.emit("create-room", room.code);
  });
  socket.on("join-room", (roomCode, callback) => {
    let status = false;
    if (activeRooms[roomCode]) {
      socket.join(roomCode);
      activeRooms[roomCode].addPlayer(socket.id, users[socket.id]);
      users[socket.id].currentRoom = roomCode;
      io.to(roomCode).emit(
        "new-player",
        users[socket.id],
        activeRooms[roomCode].players
      );
      status = true;
    } else {
      status = false;
    }
    callback({ status });

    const host = Object.keys(activeRooms[roomCode].players)[0];
    users[host].isHost = true;

    console.log(activeRooms[roomCode]);

    socket.on("send-message", (id, text) => {
      io.to(roomCode).emit("receive-message", {
        id: id,
        sender: users[socket.id].username,
        text: text,
      });
    });
  });
  socket.on("leave-room", (roomCode, callback) => {
    //! on leave room remove the player from the room, remove the room from the players current room and delete the room if the player count is 0.
    delete activeRooms[roomCode].players[socket.id];
    users[socket.id].currentRoom = "";
    if (activeRooms[roomCode].players.length === 0) {
      delete activeRooms[roomCode];
    }
    socket.leave(roomCode);
    if (!(socket.id in activeRooms[roomCode].players)) {
      callback({
        status: "ok",
      });
    }
    io.emit("player-leave-room", users[socket.id]);
  });
  socket.on("rejoin-room", (roomCode, cb) => {});
  socket.on("disconnect", () => {
    console.log("client disconnected");
  });
});
server.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.SERVER_URL}`)
);
