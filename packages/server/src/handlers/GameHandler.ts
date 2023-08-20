import {
  ClientEvents,
  ServerEvents,
  ClientPayloads,
  ServerPayloads,
} from "@hangmen/shared/types/SocketEvent";
import { Socket, Server } from "socket.io";

export const gameHandler = (
  io: Server<ClientPayloads, ServerPayloads>,
  socket: Socket<ClientPayloads, ServerPayloads>
) => {};
