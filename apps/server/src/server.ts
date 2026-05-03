import http from "http";

import express from "express";
import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import cors from "cors";
import "dotenv/config";

import {
  ClientPayloads,
  ServerPayloads,
  SocketData,
  InterServerEvents,
} from "@hangmen/shared";
import { roomHandler } from "./handlers/RoomHandler.js";
import { gameHandler } from "./handlers/GameHandler.js";
const app = express();

app.use(cors());

app.get("/health", (req, res) => {
  res.status(200).send("Server is running");
});

const server = http.createServer(app);

const io = new Server<
  ClientPayloads,
  ServerPayloads,
  InterServerEvents,
  SocketData
>(server, {
  serveClient: false,
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

instrument(io, {
  auth: false,
  mode: "development",
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  io.use((socket, next) => {
    const { username, avatarSeed } = socket.handshake.auth;
    if (!username) {
      return next(new Error("invalid username"));
    }
    socket.data = { ...socket.data, username, avatarSeed };

    next();
  });

  socket.data.reset = function () {
    this.roomId = "";
    this.isGuesser = false;
    this.isHost = false;
    this.points = 0;
    this.lives = 6;
  };
  roomHandler(io, socket);
  gameHandler(io, socket);

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});
server.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.SERVER_URL}`)
);
