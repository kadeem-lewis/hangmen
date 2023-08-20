import { ClientEvents, ServerEvents } from "@hangmen/shared/types/SocketEvent";
import { User } from "../classes/User";
import { Socket, Server } from "socket.io";

interface Users {
  [key: string]: User;
}

export const users: Users = {};

export const userHandler = (io: Server, socket: Socket) => {
  socket.on(ClientEvents.REGISTER, (username, userId) => {
    users[socket.id] = new User(username, userId); //TODO: on new user creation
  });
};
