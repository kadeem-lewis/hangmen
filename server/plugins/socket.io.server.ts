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
    socket.on(ClientEvents.register, (username, userId) => {
      users[socket.id] = new User(username, userId);
    });

    socket.on(ClientEvents.request_room_code, () => {
      const room = new Room();
      activeRooms[room.code] = room;
      io.emit(ServerEvents.create_room, room.code);
    });
    socket.on(ClientEvents.join_room, (roomCode, callback) => {
      let status = false;
      if (activeRooms[roomCode]) {
        socket.join(roomCode);
        activeRooms[roomCode].addPlayer(socket.id, users[socket.id]);
        users[socket.id].currentRoom = roomCode;
        io.to(roomCode).emit(
          ServerEvents.new_player,
          users[socket.id],
          activeRooms[roomCode].players
        );
        status = true;
        console.log(activeRooms[roomCode]);
      } else {
        status = false;
      }
      callback({ status });

      socket.on(ClientEvents.leave_room, (callback) => {
        //! on leave room remove the player from the room, remove the room from the players current room and delete the room if the player count is 0.
        delete activeRooms[roomCode].players[socket.id];
        users[socket.id].currentRoom = "";
        if (activeRooms[roomCode].players.length === 0) {
          delete activeRooms[roomCode];
        }
        socket.leave(roomCode);
        if (!(socket.id in activeRooms[roomCode].players)) {
          callback({
            status: "ok",
          });
        }
        io.emit(ServerEvents.player_leave_room, users[socket.id]);
      });
    });
    socket.on(ClientEvents.rejoin_room, (roomCode, cb) => {});
    socket.on(ClientEvents.send_message, (id, text, roomCode) => {
      //this works fine for now but I need to add a timestamp and determine if to keep io functionality or not
      io.to(roomCode).emit(ServerEvents.receive_message, {
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
