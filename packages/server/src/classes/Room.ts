import { customAlphabet } from "nanoid";
import { User } from "@hangmen/shared";
export class Room {
  code: string;
  players: { [id: string]: User };
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
      if (Object.keys(this.players).length === 0) {
        player.isHost = true;
      }

      this.players[id] = player;
    }
  }
  removePlayer(id: string) {
    const wasHost = this.players[id]?.isHost;
    delete this.players[id];

    // If the player leaving was the host, reassign the host to another player
    if (wasHost && Object.keys(this.players).length > 0) {
      const nextPlayerId = Object.keys(this.players)[0]; // Get the first available player's ID
      this.players[nextPlayerId].isHost = true;
    }
  }

  getPlayers() {
    //getter to change object values to an array
    return this.players;
  }
  createNewCode() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const nanoid = customAlphabet(characters, 5);
    const roomId = nanoid();
    return roomId;
  }
}
