class User {
  constructor(username, userId, socketId) {
    this.username = username;
    this.userId = userId;
    this.socketId = socketId;
    this.isHost = false;
    this.currentRoom = null;
  }
}
module.exports = User;
