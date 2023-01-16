const http = require("http");

const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
server.listen(3005, () =>
  console.log("Server running on https://localhost:3005")
);
