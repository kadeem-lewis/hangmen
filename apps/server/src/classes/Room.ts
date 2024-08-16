import fs from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

import { customAlphabet } from "nanoid";
import { GameSettings, User } from "@hangmen/shared";
import { maskWord } from "../utils/WordHelper.js";
export class Room {
  code: string;
  players: Map<string, User>;
  eligiblePlayers: Map<string, User> = new Map();
  maxPlayers: number;
  wordsToGuess: { word: string; category: string }[] = [];
  word: { word: string; category: string } | null = null;
  maskedWord: string[] = [];
  guessedLetters: Set<string> = new Set();
  scores: Map<string, number>;
  currentGuesser: User | null = null;

  constructor() {
    this.code = this.createNewCode();
    this.players = new Map();
    this.scores = new Map();
    this.maxPlayers = 4;
  }
  setMaxPlayers(maxPlayers: number) {
    this.maxPlayers = maxPlayers;
  }
  addPlayer(id: string, player: User) {
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
  async startGame(settings: GameSettings) {
    this.wordsToGuess = await this.fetchWords(
      settings.minWordLength,
      settings.wordsPerGame
    );
    this.word = this.wordsToGuess[0];
    this.maskedWord = maskWord(this.word.word, this.guessedLetters);
    this.currentGuesser = Array.from(this.players.values())[0];
    this.currentGuesser.isGuesser = true;
    this.eligiblePlayers = new Map(this.players);
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
  guessLetter(letter: string): number {
    this.guessedLetters.add(letter);
    if (this.word && this.word.word.includes(letter)) {
      const count = this.word.word
        .split("")
        .filter((char) => char === letter).length;
      this.maskedWord = maskWord(this.word.word, this.guessedLetters);
      return count; // The guess was correct
    }
    return 0; // The guess was incorrect
  }

  nextTurn() {
    const playerArray = Array.from(this.eligiblePlayers.values());
    const currentPlayerIndex = playerArray.findIndex(
      (player) => player === this.currentGuesser
    );
    if (currentPlayerIndex === -1) {
      this.currentGuesser = playerArray[0];
      playerArray[0].isGuesser = true;
    } else {
      this.currentGuesser =
        playerArray[(currentPlayerIndex + 1) % playerArray.length];
      this.currentGuesser.isGuesser = true;
    }
  }
}
