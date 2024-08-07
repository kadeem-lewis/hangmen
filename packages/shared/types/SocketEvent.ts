export type User = {
  username: string;
  userId: string;
  isHost: boolean;
  isReady: boolean;
  avatar: string;
};

export type Message = {
  id: string;
  sender: string;
  text: string;
  time: string;
};

export type GameSettings = {
  wordsPerGame: number;
  minWordLength: number;
  isHardMode: boolean;
};

export enum ServerEvents {
  CREATE_ROOM = "create-room",
  NEW_PLAYER = "new-player",
  RECEIVE_MESSAGE = "receive-message",
  PLAYER_LEAVE_ROOM = "player-leave-room",
  GAME_START = "game-start",
  GAME_UPDATE = "game-update",
}
export enum ClientEvents {
  REQUEST_ROOM_CODE = "request-room-code",
  JOIN_ROOM = "join-room",
  SEND_MESSAGE = "send-message",
  LEAVE_ROOM = "leave-room",
  START_GAME = "start-game",
  SEND_GUESS = "send-guess",
  SKIP_TURN = "skip-turn",
}

export interface ServerPayloads {
  [ServerEvents.CREATE_ROOM]: (roomCode: string) => void;
  [ServerEvents.NEW_PLAYER]: (user: User, playerList: [string, User][]) => void;

  [ServerEvents.RECEIVE_MESSAGE]: (message: Message) => void;

  [ServerEvents.PLAYER_LEAVE_ROOM]: (
    user: User,
    playerList: [string, User][]
  ) => void;
  [ServerEvents.GAME_START]: () => void;
  [ServerEvents.GAME_UPDATE]: (word: string[]) => void;
}
export interface ClientPayloads {
  [ClientEvents.REQUEST_ROOM_CODE]: () => void;
  [ClientEvents.JOIN_ROOM]: (
    roomCode: string,
    callback: (response: {
      status: string;
      message?: string;
      data?: { player: User; playerList: [string, User][] };
    }) => void
  ) => void;

  [ClientEvents.SEND_MESSAGE]: (id: string, text: string) => void;

  [ClientEvents.LEAVE_ROOM]: (
    roomCode: string,
    callback: (response: { status: string; message?: string }) => void
  ) => void;
  [ClientEvents.START_GAME]: (
    gameSettings: {
      wordsPerGame: number;
      minWordLength: number;
      isHardMode: boolean;
    },
    callback: (response: {
      status: string;
      word: string[];
      category: string;
    }) => void
  ) => void;
  [ClientEvents.SEND_GUESS]: (input: any) => void;
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
  reset: () => void;
}
