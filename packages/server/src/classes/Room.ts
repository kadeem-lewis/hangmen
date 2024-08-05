import fs from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

import { customAlphabet } from "nanoid";
import { User } from "@hangmen/shared";
import { maskWord } from "../utils/WordHelper.js";
export class Room {
  code: string;
  players: Map<string, User>;
  maxPlayers: number;
  wordsToGuess: { word: string; category: string }[] = [];
  word: { word: string; category: string } | null = null;
  maskedWord: string[] = [];
  guessedLetters: Set<string> = new Set();
  scores: { [id: string]: number } = {};

  constructor() {
    this.code = this.createNewCode();
    this.players = new Map();
    this.maxPlayers = 4;
  }
  setMaxPlayers(maxPlayers: number) {
    this.maxPlayers = maxPlayers;
  }
  addPlayer(id: string, player: any) {
    if (this.players.size < this.maxPlayers && !this.players.has(id)) {
      if (this.players.size === 0) {
        player.isHost = true;
      }
      this.players.set(id, player);
    }
  }
  removePlayer(id: string) {
    const wasHost = this.players.get(id)?.isHost;
    this.players.delete(id);

    // If the player leaving was the host, reassign the host to another player
    if (wasHost && this.players.size > 0) {
      const firstPlayer = this.players.values().next().value;
      if (firstPlayer) firstPlayer.isHost = true;
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
  async startGame(settings: {
    wordsPerGame: number;
    minWordLength: number;
    isHardMode: boolean;
  }) {
    this.wordsToGuess = await this.fetchWords(
      settings.minWordLength,
      settings.wordsPerGame
    );
    this.word = this.wordsToGuess[0];
    this.maskedWord = maskWord(this.word.word, this.guessedLetters);
  }
  async fetchWords(minWordLength: number, numOfWords: number) {
    try {
      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const filePath = path.resolve(__dirname, "../data/words.json");
      const fileContent = await fs.readFile(filePath, "utf8");
      const words: { word: string; category: string }[] =
        JSON.parse(fileContent);

      const validWords: { word: string; category: string }[] = words.filter(
        (item) => item.word.length >= minWordLength
      );

      const result = [];
      const usedIndices = new Set<number>();

      while (result.length < numOfWords && result.length < validWords.length) {
        const randomIndex = Math.floor(Math.random() * validWords.length);

        if (!usedIndices.has(randomIndex)) {
          result.push(validWords[randomIndex]);
          usedIndices.add(randomIndex);
        }
      }

      return result;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  guessLetter(letter: string): boolean {
    if (this.word && this.word.word.includes(letter)) {
      this.guessedLetters.add(letter);
      this.maskedWord = maskWord(this.word.word, this.guessedLetters);
      return true; // The guess was correct
    }
    return false; // The guess was incorrect
  }
}
