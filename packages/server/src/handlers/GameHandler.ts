import { Socket, Server } from "socket.io";
import {
  ClientEvents,
  ServerEvents,
  ClientPayloads,
  ServerPayloads,
} from "@hangmen/shared/types/SocketEvent";
import { users } from "./UserHandler";
import { activeRooms } from "./RoomHandler";

export const gameHandler = (
  io: Server<ClientPayloads, ServerPayloads>,
  socket: Socket<ClientPayloads, ServerPayloads>
) => {
  socket.on(ClientEvents.START_GAME, () => {
    const roomCode = users[socket.id].currentRoom;
    io.in(roomCode).emit(ServerEvents.GAME_START);
  });
  socket.on(ClientEvents.GAME_SETTINGS, () => {});
};
