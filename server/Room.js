class Room {
  constructor() {
    this.code = this.createNewCode();
    this.players = [];
  }
  addPlayer(player) {
    this.players.push(player);
  }
  createNewCode() {
    let roomId = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < 5; i++) {
      roomId += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return roomId;
  }
}
module.exports = Room;
