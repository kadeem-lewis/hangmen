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
  socket.on("join-room", (roomCode, cb) => {
    if (activeRooms[roomCode]) {
      socket.join(roomCode);
      activeRooms[roomCode].addPlayer(socket.id, users[socket.id]);
      users[socket.id].currentRoom = roomCode;
      io.to(roomCode).emit(
        "new-player",
        users[socket.id],
        activeRooms[roomCode].players
      );

      console.log(activeRooms[roomCode]);
    } else {
      cb("Game not found");
    }

    socket.on("send-message", (id, text) => {
      io.to(roomCode).emit("receive-message", {
        id: id,
        sender: users[socket.id].username,
        text: text,
      });
    });
    socket.on("rejoin-room", (roomCode, cb) => {});
    socket.on("leave-room", (cb) => {
      //delete activeRooms[roomCode];
      delete activeRooms[roomCode].players[socket.id];
      users[socket.id].currentRoom = "";
      socket.leave(roomCode);
      if (!(socket.id in activeRooms[roomCode].players)) {
        cb({
          status: "ok",
        });
      }
      io.emit("player-leave-room", users[socket.id]);
    });
  });
  socket.on("disconnect", () => {
    console.log("client disconnected");
  });
});
server.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.SERVER_URL}`)
);
