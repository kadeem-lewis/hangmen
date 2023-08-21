import http from "http";

import express from "express";
import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import cors from "cors";
import "dotenv/config";

import {
  ClientPayloads,
  ServerPayloads,
} from "@hangmen/shared/types/SocketEvent.js";
import { userHandler } from "./handlers/UserHandler.js";
import { roomHandler } from "./handlers/RoomHandler.js";
import { gameHandler } from "./handlers/GameHandler.js";
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

instrument(io, {
  auth: {
    type: "basic",
    username: "klewis",
    password: process.env.ADMIN_PASSWORD as string, //probably use process.env or something
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
