import { Socket, Server } from "socket.io";
import {
  ClientEvents,
  ServerEvents,
  ClientPayloads,
  ServerPayloads,
} from "@hangmen/shared";
import { activeRooms } from "./RoomHandler.js";

export const gameHandler = (
  io: Server<ClientPayloads, ServerPayloads>,
  socket: Socket<ClientPayloads, ServerPayloads>
) => {
  socket.on(ClientEvents.START_GAME, () => {
    const roomCode = socket.data.roomId;
    io.in(roomCode).emit(ServerEvents.GAME_START);
  });
  socket.on(ClientEvents.GAME_SETTINGS, () => {
    //TODO: find the best time and way to send game settings
  });
};
