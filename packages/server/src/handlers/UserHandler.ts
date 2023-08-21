import {
  ClientEvents,
  ServerEvents,
  ClientPayloads,
  ServerPayloads,
} from "@hangmen/shared/types/SocketEvent.js";
import { User } from "../classes/User.js";
import { Socket, Server } from "socket.io";

interface Users {
  [key: string]: User;
}

export const users: Users = {};

export const userHandler = (
  io: Server<ClientPayloads, ServerPayloads>,
  socket: Socket<ClientPayloads, ServerPayloads>
) => {
  socket.on(ClientEvents.REGISTER, (username, userId) => {
    users[socket.id] = new User(username, userId); //TODO: client probably shouldn't be emitting id, look into the cookie thing or generate the id server side
  });
};
