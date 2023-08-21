import { customAlphabet } from "nanoid";

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
    //getter to change object values to an array
    return Object.values(this.players);
  }
  setPlayerReady(playerId: string) {
    this.readyPlayers.add(playerId);
  }

  unsetPlayerReady(playerId: string) {
    this.readyPlayers.delete(playerId);
  }

  allPlayersReady(): boolean {
    return this.readyPlayers.size === Object.keys(this.players).length;
  }
  createNewCode() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const nanoid = customAlphabet(characters, 5);
    const roomId = nanoid();
    return roomId;
  }
}
