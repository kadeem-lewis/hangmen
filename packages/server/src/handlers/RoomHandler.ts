import {
  ClientEvents,
  ServerEvents,
  ClientPayloads,
  ServerPayloads,
} from "@hangmen/shared";
import { Socket, Server } from "socket.io";
import { Room } from "../classes/Room.js";
import { users } from "./UserHandler.js";

interface ActiveRooms {
  [key: string]: Room;
}

export const activeRooms: ActiveRooms = {};

export const roomHandler = (
  io: Server<ClientPayloads, ServerPayloads>,
  socket: Socket<ClientPayloads, ServerPayloads>
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
        activeRooms[roomCode].addPlayer(socket.id, users[socket.id]);
        users[socket.id].currentRoom = roomCode;
        io.in(roomCode).emit(
          ServerEvents.NEW_PLAYER,
          users[socket.id],
          activeRooms[roomCode].getPlayers()
        );
      });

      console.log(activeRooms[roomCode]);
      console.log(socket.rooms);
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
      delete activeRooms[roomCode].players[socket.id];
      users[socket.id].resetUser();
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
      io.in(roomCode).emit(ServerEvents.PLAYER_LEAVE_ROOM, users[socket.id]);
    } else {
      callback({
        status: "error",
        message: "Error leaving the room. Room or player not found.",
      });
    }
  });
  socket.on(ClientEvents.REJOIN_ROOM, (roomCode, cb) => {});
  socket.on(ClientEvents.SEND_MESSAGE, (id, text) => {
    //this works fine for now but I need to add a timestamp and determine if to keep io functionality or not
    io.in(users[socket.id].currentRoom).emit(ServerEvents.RECEIVE_MESSAGE, {
      id,
      sender: users[socket.id].username,
      text,
    });
  });
  socket.on(ClientEvents.PLAYER_READY, (isReady) => {
    const roomCode = users[socket.id].currentRoom;
    if (isReady) {
      activeRooms[roomCode].setPlayerReady(socket.id);
      users[socket.id].isReady = true;
    } else {
      activeRooms[roomCode].unsetPlayerReady(socket.id);
      users[socket.id].isReady = false;
    }
    io.in(roomCode).emit(
      ServerEvents.READY_PLAYERS,
      activeRooms[roomCode].readyPlayers //client does have access to have id system
    );
  });
};
