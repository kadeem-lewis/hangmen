import { Server } from "socket.io";

export default defineNitroPlugin((nitroApp) => {
  const socketServer = new Server(useRuntimeConfig().public.socketPort, {
    serveClient: false,
    cors: {
      origin: "*",
    },
  });

  socketServer.on("connection", (socket) => {
    socket.emit("");
  });
});
