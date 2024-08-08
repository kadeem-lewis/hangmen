import type { GameSettings, User } from "@hangmen/shared";

export const useGameStore = defineStore("game", () => {
  const { $io } = useNuxtApp();
  const { players } = storeToRefs(useRoomStore());
  const { gameCode } = storeToRefs(useRoomStore());
  const guessedWord = ref<string[]>([]);
  const guessedLetters = ref(new Set<string>());
  const wordToGuess = ref<string[]>([]);
  const wordCategory = ref<string>("");
  const gameSettings = ref<GameSettings | null>(null);
  const currentPlayer = ref<User | null>(null);

  function bindEvents() {
    $io.on(
      ServerEvents.GAME_UPDATE,
      (word, letters, currentGuesser, playerList) => {
        wordToGuess.value = word;
        guessedLetters.value = new Set(letters);
        currentPlayer.value = currentGuesser;
        players.value = new Map(playerList);
      },
    );

    $io.on(ServerEvents.GAME_START, (word, category, currentGuesser) => {
      wordToGuess.value = word;
      wordCategory.value = category;
      currentPlayer.value = currentGuesser;
      navigateTo({
        path: `/game/${gameCode.value}/play`,
      });
    });

    $io.on(ServerEvents.GAME_OVER, () => {
      navigateTo({
        path: `/game/${gameCode.value}/gameover`,
      });
    });
  }

  function startGame() {
    if (!gameSettings.value) return;
    $io.emit(ClientEvents.START_GAME, gameSettings.value, (response) => {
      if (response.status === "ok") {
        console.log("Game started", response);
      }
    });
  }

  function sendGuess(guess: string) {
    $io.emit(ClientEvents.SEND_GUESS, guess);
  }

  const skipTurn = () => {
    $io.emit(ClientEvents.SKIP_TURN);
  };

  return {
    guessedWord,
    wordToGuess,
    gameSettings,
    wordCategory,
    currentPlayer,
    guessedLetters,
    bindEvents,
    startGame,
    skipTurn,
    sendGuess,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot));
}
