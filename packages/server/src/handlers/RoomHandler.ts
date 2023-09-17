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
      setTimeout(() => {
        //temporary fix to issue
        console.log(socket.data);
        activeRooms[roomCode].addPlayer(socket.id, socket.data);
        socket.data.roomId = roomCode;
        io.in(roomCode).emit(
          ServerEvents.NEW_PLAYER,
          socket.data,
          activeRooms[roomCode].getPlayers()
        );
      });

      console.log(activeRooms[roomCode]);
      console.log(socket.rooms);
      console.log(activeRooms[roomCode].getPlayers());
      callback({
        status: "ok",
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
    if (roomCode in activeRooms && socket.id in activeRooms[roomCode].players) {
      activeRooms[roomCode].removePlayer(socket.id);
      socket.data.reset();
      if (Object.keys(activeRooms[roomCode].players).length === 0) {
        delete activeRooms[roomCode];
      }
      socket.leave(roomCode);
      if (
        !(roomCode in activeRooms && socket.id in activeRooms[roomCode].players)
      ) {
        callback({
          status: "ok",
        });
      }
      io.in(roomCode).emit(ServerEvents.PLAYER_LEAVE_ROOM, socket.data);
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
  socket.on(ClientEvents.PLAYER_READY, (isReady) => {
    const roomCode = socket.data.roomId;
    if (isReady) {
      activeRooms[roomCode].setPlayerReady(socket.id);
      socket.data.isReady = true;
    } else {
      activeRooms[roomCode].unsetPlayerReady(socket.id);
      socket.data.isReady = false;
    }
    io.in(roomCode).emit(
      ServerEvents.READY_PLAYERS,
      activeRooms[roomCode].readyPlayers //client does have access to have id system
    );
  });
};
