import { io, Socket } from "socket.io-client";
import { ClientPayloads, ServerPayloads } from "utils/SocketEvent";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public;

  const socket: Socket<ServerPayloads, ClientPayloads> = io(
    `${config.url}:${config.socketPort}`,
    {
      autoConnect: false,
    }
  );

  return {
    provide: {
      io: socket,
    },
  };
});
