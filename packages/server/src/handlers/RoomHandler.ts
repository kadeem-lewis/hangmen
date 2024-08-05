import {
  ClientEvents,
  ServerEvents,
  ClientPayloads,
  ServerPayloads,
  InterServerEvents,
  SocketData,
} from "@hangmen/shared";
import { Socket, Server } from "socket.io";
import { Room } from "../classes/Room.js";

interface ActiveRooms {
  [key: string]: Room;
}

// Active rooms should probably be a Set instead of an object
export const activeRooms: ActiveRooms = {};

export const roomHandler = (
  io: Server<ClientPayloads, ServerPayloads, InterServerEvents, SocketData>,
  socket: Socket<ClientPayloads, ServerPayloads, InterServerEvents, SocketData>
) => {
  socket.on(ClientEvents.REQUEST_ROOM_CODE, () => {
    const room = new Room();
    activeRooms[room.code] = room;
    socket.emit(ServerEvents.CREATE_ROOM, room.code);
  });
  socket.on(ClientEvents.JOIN_ROOM, (roomCode, callback) => {
    if (activeRooms[roomCode]) {
      socket.join(roomCode);
      socket.data.roomId = roomCode;
      activeRooms[roomCode].addPlayer(socket.id, socket.data);

      socket
        .in(roomCode)
        .emit(
          ServerEvents.NEW_PLAYER,
          socket.data,
          Array.from(activeRooms[roomCode].getPlayers())
        );

      console.log("Current Socket is in these rooms: ", socket.rooms);
      // This callback would give new players the current player list but future players wouldn't get sent
      callback({
        status: "ok",
        data: {
          player: socket.data,
          playerList: Array.from(activeRooms[roomCode].getPlayers()),
        },
      });
    } else {
      callback({
        status: "error",
        message: "This room doesn't exist",
      });
    }
  });
  socket.on(ClientEvents.LEAVE_ROOM, (roomCode, callback) => {
    //on leave room remove the player from the room, remove the room from the players current room and delete the room if the player count is 0.
    if (
      roomCode in activeRooms &&
      activeRooms[roomCode].players.has(socket.id)
    ) {
      activeRooms[roomCode].removePlayer(socket.id);
      socket.data.reset();
      if (activeRooms[roomCode].players.size === 0) {
        delete activeRooms[roomCode];
      }
      socket.leave(roomCode);
      if (
        !(
          roomCode in activeRooms &&
          activeRooms[roomCode].players.has(socket.id)
        )
      ) {
        callback({
          status: "ok",
        });
      }
      io.in(roomCode).emit(
        ServerEvents.PLAYER_LEAVE_ROOM,
        socket.data,
        Array.from(activeRooms[roomCode].getPlayers())
      );
    } else {
      callback({
        status: "error",
        message: "Error leaving the room. Room or player not found.",
      });
    }
  });
  socket.on(ClientEvents.SEND_MESSAGE, (id, text) => {
    //this works fine for now but I need to add a timestamp and determine if to keep io functionality or not
    const date = new Date();

    io.in(socket.data.roomId).emit(ServerEvents.RECEIVE_MESSAGE, {
      id,
      sender: socket.data.username,
      text,
      time: `${date.getHours()}:${date.getMinutes()}`,
    });
  });
};
