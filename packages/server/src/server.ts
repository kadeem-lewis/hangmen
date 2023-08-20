import http from "http";

import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import "dotenv/config";

import {
  ClientPayloads,
  ServerPayloads,
} from "@hangmen/shared/types/SocketEvent";
import { userHandler } from "./handlers/UserHandler";
import { roomHandler } from "./handlers/RoomHandler";
import { gameHandler } from "./handlers/GameHandler";
const app = express();

app.use(cors());

app.get("/health", (req, res) => {
  res.status(200).send("Server is running");
});

const server = http.createServer(app);

const io = new Server<ClientPayloads, ServerPayloads>(server, {
  serveClient: false,
  cookie: true,
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  userHandler(io, socket);
  roomHandler(io, socket);
  gameHandler(io, socket);

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});
server.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.SERVER_URL}`)
);
