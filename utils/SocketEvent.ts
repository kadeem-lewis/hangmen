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
