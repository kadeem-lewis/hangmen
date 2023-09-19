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
export enum ServerEvents {
  CREATE_ROOM = "create-room",
  NEW_PLAYER = "new-player",
  RECEIVE_MESSAGE = "receive-message",
  PLAYER_LEAVE_ROOM = "player-leave-room",
  GAME_START = "game-start",
}
export enum ClientEvents {
  REQUEST_ROOM_CODE = "request-room-code",
  JOIN_ROOM = "join-room",
  SEND_MESSAGE = "send-message",
  LEAVE_ROOM = "leave-room",
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

  [ServerEvents.RECEIVE_MESSAGE]: (message: Message) => void;

  [ServerEvents.PLAYER_LEAVE_ROOM]: (user: User) => void;
  [ServerEvents.GAME_START]: () => void;
}
export interface ClientPayloads {
  [ClientEvents.REQUEST_ROOM_CODE]: () => void;
  [ClientEvents.JOIN_ROOM]: (
    roomCode: string,
    callback: (response: {
      status: string;
      message?: string;
      data?: { player: User; playerList: { [id: string]: User } };
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
  reset: () => void;
}
