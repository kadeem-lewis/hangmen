import { Server } from "socket.io";

export default defineNitroPlugin((nitroApp) => {
  const io = new Server(useRuntimeConfig().public.socketPort, {
    serveClient: false,
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log(`${socket.id} is getting litty`);
    socket.on(SocketEvent.register, (username, userId) => {});
  });
});
