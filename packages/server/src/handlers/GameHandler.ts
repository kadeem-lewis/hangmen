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
  socket.on(ClientEvents.START_GAME, (settings, callback) => {
    const room = activeRooms[socket.data.roomId];

    room.startGame(settings);

    if (room.word) {
      callback({
        status: "ok",
        word: room.maskedWord,
        category: room.word.category,
      });
    }
  });
};
