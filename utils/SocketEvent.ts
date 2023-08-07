export enum ServerEvents {
  create_room = "create-room",
  new_player = "new-player",
  receive_message = "receive-message",
  disconnect = "disconnect",
  player_leave_room = "player-leave-room",
}
export enum ClientEvents {
  register = "register",
  request_room_code = "request-room-code",
  join_room = "join-room",
  send_message = "send-message",
  leave_room = "leave-room",
  rejoin_room = "rejoin-room",
}
