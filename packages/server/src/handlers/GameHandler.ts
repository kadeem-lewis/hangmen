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
      //this callback only sends it to the socket that started the game. Callback should probably only let user know that start game didnt fail
      callback({
        status: "ok",
        word: room.maskedWord,
        category: room.word.category,
      });
    }
    socket.on(ClientEvents.SEND_GUESS, (guess) => {
      room.guessLetter(guess);

      io.in(socket.data.roomId).emit(ServerEvents.GAME_UPDATE, room.maskedWord);
    });
  });
};
