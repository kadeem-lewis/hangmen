import { Server } from "socket.io";
import { Room } from "../classes/Room";
import { User } from "../classes/User";

export default defineNitroPlugin((nitroApp) => {
  const io = new Server(useRuntimeConfig().public.socketPort, {
    serveClient: false,
    cors: {
      origin: "*",
      credentials: true,
    },
  });

  interface Users {
    [key: string]: User;
  }
  interface ActiveRooms {
    [key: string]: Room;
  }
  const users: Users = {};
  const activeRooms: ActiveRooms = {};

  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    socket.on(ClientEvents.REGISTER, (username, userId) => {
      users[socket.id] = new User(username, userId);
    });

    socket.on(ClientEvents.REQUEST_ROOM_CODE, () => {
      const room = new Room();
      activeRooms[room.code] = room;
      socket.emit(ServerEvents.CREATE_ROOM, room.code);
    });
    socket.on(ClientEvents.JOIN_ROOM, (roomCode, callback) => {
      let status = false;
      if (activeRooms[roomCode]) {
        socket.join(roomCode);
        activeRooms[roomCode].addPlayer(socket.id, users[socket.id]);
        users[socket.id].currentRoom = roomCode;
        io.to(roomCode).emit(
          ServerEvents.NEW_PLAYER,
          users[socket.id],
          activeRooms[roomCode].getPlayers()
        );
        status = true;
        console.log(activeRooms[roomCode]);
      } else {
        status = false;
      }
      callback({ status });
    });
    socket.on(ClientEvents.LEAVE_ROOM, (roomCode, callback) => {
      //! on leave room remove the player from the room, remove the room from the players current room and delete the room if the player count is 0.
      if (
        roomCode in activeRooms &&
        socket.id in activeRooms[roomCode].players
      ) {
        delete activeRooms[roomCode].players[socket.id];
        users[socket.id].currentRoom = "";
        if (Object.keys(activeRooms[roomCode].players).length === 0) {
          delete activeRooms[roomCode];
        }
        socket.leave(roomCode);
        if (
          !(
            roomCode in activeRooms &&
            socket.id in activeRooms[roomCode].players
          )
        ) {
          callback({
            status: "ok",
          });
        }
        io.to(roomCode).emit(ServerEvents.PLAYER_LEAVE_ROOM, users[socket.id]);
      } else {
        callback({
          status: "error",
          message: "Error leaving the room. Room or player not found.",
        });
      }
    });
    socket.on(ClientEvents.REJOIN_ROOM, (roomCode, cb) => {});
    socket.on(ClientEvents.SEND_MESSAGE, (id, text, roomCode) => {
      //this works fine for now but I need to add a timestamp and determine if to keep io functionality or not
      io.to(roomCode).emit(ServerEvents.RECEIVE_MESSAGE, {
        id,
        sender: users[socket.id].username,
        text,
      });
    });
    socket.on("disconnect", () => {
      console.log("User Disconnected:", socket.id);
    });
  });
});
