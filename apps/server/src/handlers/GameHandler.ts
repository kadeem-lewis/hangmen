import { Socket, Server } from "socket.io";
import {
  ClientEvents,
  ServerEvents,
  ClientPayloads,
  ServerPayloads,
  InterServerEvents,
  SocketData,
} from "@hangmen/shared";
import { activeRooms } from "./RoomHandler.js";

export const gameHandler = (
  io: Server<ClientPayloads, ServerPayloads, InterServerEvents, SocketData>,
  socket: Socket<ClientPayloads, ServerPayloads, InterServerEvents, SocketData>
) => {
  socket.on(ClientEvents.START_GAME, async (settings, callback) => {
    const room = activeRooms[socket.data.roomId];

    await room.startGame(settings);

    if (room.word) {
      //this callback only sends it to the socket that started the game. Callback should probably only let user know that start game didnt fail
      console.log("word: ", room.word);
      callback({
        status: "ok",
        word: room.maskedWord,
        category: room.word.category,
      });
      io.in(room.code).emit(
        ServerEvents.GAME_START,
        room.maskedWord,
        room.word.category,
        room.currentGuesser!
      );
    }
  });
  socket.on(ClientEvents.SEND_GUESS, (guess) => {
    const room = activeRooms[socket.data.roomId];
    //this needs to also track who is the current guesser
    const score = room.guessLetter(guess);
    // I also need to get the number of times the letter was in the word
    if (score > 0) {
      const currentScore = room.scores.get(socket.id) ?? 0;
      room.scores.set(socket.id, currentScore + score);
      socket.data.points = room.scores.get(socket.id)!;
    } else {
      socket.data.lives -= 1;
      if (socket.data.lives === 0) {
        room.eligiblePlayers.delete(socket.id);

        if (room.eligiblePlayers.size === 0) {
          io.in(socket.data.roomId).emit(ServerEvents.GAME_OVER);
        }
      }
    }
    if (room.getPlayers().size > 1) socket.data.isGuesser = false;
    room.nextTurn();

    // add guessed letters to data sent
    io.in(socket.data.roomId).emit(
      ServerEvents.GAME_UPDATE,
      room.maskedWord,
      Array.from(room.guessedLetters),
      room.currentGuesser!,
      Array.from(room.getPlayers())
    );
  });
  socket.on(ClientEvents.SKIP_TURN, () => {
    const room = activeRooms[socket.data.roomId];
    room.nextTurn();

    if (room.getPlayers().size > 1) socket.data.isGuesser = false;

    console.log("Socket Data:", socket.data);
    console.log("Player Data:", room.players.get(socket.id));

    io.in(socket.data.roomId).emit(
      ServerEvents.GAME_UPDATE,
      room.maskedWord,
      Array.from(room.guessedLetters),
      room.currentGuesser!,
      Array.from(room.getPlayers())
    );
  });
};
