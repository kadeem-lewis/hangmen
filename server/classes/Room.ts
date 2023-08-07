import { customAlphabet } from "nanoid";
export class Room {
  code: string;
  players: { [id: string]: any };
  constructor() {
    this.code = this.createNewCode();
    this.players = {};
  }
  addPlayer(id: string, player: any) {
    this.players[id] = player;
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
