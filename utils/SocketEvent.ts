import { Server } from "http";
import { User } from "server/classes/User";
export enum ServerEvents {
  CREATE_ROOM = "create-room",
  NEW_PLAYER = "new-player",
  RECEIVE_MESSAGE = "receive-message",
  PLAYER_LEAVE_ROOM = "player-leave-room",
}
export enum ClientEvents {
  REGISTER = "register",
  REQUEST_ROOM_CODE = "request-room-code",
  JOIN_ROOM = "join-room",
  SEND_MESSAGE = "send-message",
  LEAVE_ROOM = "leave-room",
  REJOIN_ROOM = "rejoin-room",
  PLAYER_READY = "player-ready",
  GAME_SETTINGS = "game-settings",
}

export type ServerPayloads = {
  [ServerEvents.CREATE_ROOM]: {
    roomCode: string;
  };
  [ServerEvents.NEW_PLAYER]: {
    user: User;
    playerList: User[];
  };
  [ServerEvents.RECEIVE_MESSAGE]: {
    id: string;
    sender: string;
    text: string;
  };
  [ServerEvents.PLAYER_LEAVE_ROOM]: {
    user: User;
  };
};
export type ClientPayloads = {
  [ClientEvents.REGISTER]: {
    username: string;
    userId: string;
  };
  [ClientEvents.REQUEST_ROOM_CODE]: {};
  [ClientEvents.JOIN_ROOM]: {
    roomCode: string;
  };
  [ClientEvents.SEND_MESSAGE]: {
    id: string;
    text: string;
    roomCode: string;
  };
  [ClientEvents.LEAVE_ROOM]: {
    roomCode: string;
  };
  [ClientEvents.REJOIN_ROOM]: {};
  [ClientEvents.PLAYER_READY]: {};
  [ClientEvents.GAME_SETTINGS]: {
    settings: Object;
  };
};
