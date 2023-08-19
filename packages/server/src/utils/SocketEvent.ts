import { User } from "../classes/User.ts";
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

export interface ServerPayloads {
  [ServerEvents.CREATE_ROOM]: (roomCode: string) => void;
  [ServerEvents.NEW_PLAYER]: (user: User, playerList: User[]) => void;

  [ServerEvents.RECEIVE_MESSAGE]: (Object: {
    id: string;
    sender: string;
    text: string;
  }) => void;

  [ServerEvents.PLAYER_LEAVE_ROOM]: (user: User) => void;
}
export interface ClientPayloads {
  [ClientEvents.REGISTER]: (username: string, userId: string) => void;
  [ClientEvents.REQUEST_ROOM_CODE]: () => void;
  [ClientEvents.JOIN_ROOM]: (
    roomCode: string,
    callback: (response: { status: boolean }) => void
  ) => void;

  [ClientEvents.SEND_MESSAGE]: (
    id: string,
    text: string,
    roomCode: string
  ) => void;

  [ClientEvents.LEAVE_ROOM]: (
    roomCode: string,
    callback: (response: { status: string; message?: string }) => void
  ) => void;

  [ClientEvents.REJOIN_ROOM]: (roomCode: string, callback: () => void) => void;
  [ClientEvents.PLAYER_READY]: (isReady: boolean) => void;
  [ClientEvents.GAME_SETTINGS]: (Object: {
    wordsPerGame: number;
    minWordLength: number;
    isHardMode: boolean;
  }) => void;
}
