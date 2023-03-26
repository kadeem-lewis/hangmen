export class Room {
  constructor() {
    this.code = this.createNewCode();
    this.players = {};
  }
  addPlayer(id, player) {
    this.players[id] = player;
  }
  getPlayers() {
    return Object.values(this.players);
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
