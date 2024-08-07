import type { GameSettings } from "@hangmen/shared";

export const useGameStore = defineStore("game", () => {
  const { $io } = useNuxtApp();
  const guessedWord = ref<string[]>([]);
  const wordToGuess = ref<string[]>([]);
  const gameSettings = ref<GameSettings | null>(null);
  function bindEvents() {
    $io.on(ServerEvents.GAME_UPDATE, (word) => {
      wordToGuess.value = word;
    });
  }

  function startGame(roomCode: string) {
    if (!gameSettings.value) return;
    $io.emit(ClientEvents.START_GAME, gameSettings.value, (response) => {
      if (response.status === "ok") {
        wordToGuess.value = response.word;
        navigateTo({ path: `/game/${roomCode}/play` });
      }
    });
  }

  const skipTurn = () => {
    $io.emit(ClientEvents.SKIP_TURN);
  };

  return {
    guessedWord,
    wordToGuess,
    gameSettings,
    bindEvents,
    startGame,
    skipTurn,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot));
}
