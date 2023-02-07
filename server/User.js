class User {
  constructor(username, userId) {
    this.username = username;
    this.userId = userId;
    this.isHost = false;
    this.currentRoom = null;
  }
}
module.exports = User;
