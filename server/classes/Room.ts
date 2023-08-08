import { customAlphabet } from "nanoid";
export class Room {
  code: string;
  players: { [id: string]: any };
  maxPlayers: number;
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
  createNewCode() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const nanoid = customAlphabet(characters, 5);
    const roomId = nanoid();
    return roomId;
  }
}
