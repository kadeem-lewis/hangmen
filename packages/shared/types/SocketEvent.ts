export type User = {
  username: string;
  userId: string;
  isHost: boolean;
  isReady: boolean;
  avatar: string;
};
export enum ServerEvents {
  CREATE_ROOM = "create-room",
  NEW_PLAYER = "new-player",
  RECEIVE_MESSAGE = "receive-message",
  PLAYER_LEAVE_ROOM = "player-leave-room",
  READY_PLAYERS = "ready-players",
  GAME_START = "game-start",
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
  START_GAME = "start-game",
  GUESS_LETTER = "guess-letter",
  GUESS_WORD = "guess-word",
  SKIP_TURN = "skip-turn",
}

export interface ServerPayloads {
  [ServerEvents.CREATE_ROOM]: (roomCode: string) => void;
  [ServerEvents.NEW_PLAYER]: (
    user: User,
    playerList: { [id: string]: User }
  ) => void;

  [ServerEvents.RECEIVE_MESSAGE]: (Object: {
    id: string;
    sender: string;
    text: string;
  }) => void;

  [ServerEvents.PLAYER_LEAVE_ROOM]: (user: User) => void;
  [ServerEvents.READY_PLAYERS]: (readyPlayers: Set<string>) => void;
  [ServerEvents.GAME_START]: () => void;
}
export interface ClientPayloads {
  [ClientEvents.REGISTER]: (username: string, userId: string) => void;
  [ClientEvents.REQUEST_ROOM_CODE]: () => void;
  [ClientEvents.JOIN_ROOM]: (
    roomCode: string,
    callback: (response: { status: string; message?: string }) => void
  ) => void;

  [ClientEvents.SEND_MESSAGE]: (id: string, text: string) => void;

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
  [ClientEvents.START_GAME]: () => void;
  [ClientEvents.GUESS_LETTER]: (letter: string) => void;
  [ClientEvents.GUESS_WORD]: (word: string) => void;
  [ClientEvents.SKIP_TURN]: () => void;
}
export interface InterServerEvents {}
export interface SocketData {
  roomId: string;
  isReady: boolean;
  username: string;
  userId: string;
  isHost: boolean;
  points: number;
  avatar: string;
}
