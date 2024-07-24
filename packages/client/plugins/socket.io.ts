import { io, Socket } from "socket.io-client";
import type { ClientPayloads, ServerPayloads } from "@hangmen/shared";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public;

  const socket: Socket<ServerPayloads, ClientPayloads> = io(`${config.url}`, {
    autoConnect: false,
    withCredentials: true,
  });

  return {
    provide: {
      io: socket,
    },
  };
});
