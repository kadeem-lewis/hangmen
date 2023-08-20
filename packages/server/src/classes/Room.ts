export class Room {
  code: string;
  players: { [id: string]: any };
  maxPlayers: number;
  readyPlayers: Set<string> = new Set();

  constructor() {
    this.code = this.createNewCode();
    this.players = {};
    this.maxPlayers = 4;
  }
  setMaxPlayers(maxPlayers: number) {
    this.maxPlayers = maxPlayers;
  }
  addPlayer(id: string, player: any) {
    if (
      Object.keys(this.players).length < this.maxPlayers &&
      !this.players[id]
    ) {
      this.players[id] = player;
    }
  }
  getPlayers() {
    return Object.values(this.players);
  }
  markPlayerReady(playerId: string) {
    this.readyPlayers.add(playerId);
  }

  unmarkPlayerReady(playerId: string) {
    this.readyPlayers.delete(playerId);
  }

  allPlayersReady(): boolean {
    return this.readyPlayers.size === Object.keys(this.players).length;
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
