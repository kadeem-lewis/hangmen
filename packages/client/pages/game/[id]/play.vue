<template>
  <div class="flex h-full flex-col justify-between">
    <AppHangmanWord />
    <AppHangmanCanvas />
    <div class="flex justify-between">
      <div>
        <button
          class="rounded-lg border px-4 py-2 text-xl font-semibold hover:bg-white hover:text-black"
          @click="letterClick = true"
        >
          Guess Letter
        </button>
        <UiModal v-model="letterClick" title="Guess Letter">
          <form @submit.prevent="guessLetter">
            <label for="letter-guess">letter</label>
            <input type="text" name="letter-guess" />
            <button>Guess</button>
          </form>
        </UiModal>
      </div>
      <div>
        <button
          class="rounded-lg border px-4 py-2 text-xl font-semibold hover:bg-white hover:text-black"
          @click="wordClick = true"
        >
          Guess Word
        </button>
        <UiModal v-model="wordClick" title="Guess Word">
          <form @submit.prevent="guessWord">
            <label for="word-guess">Word</label>
            <input type="text" name="word-guess" />
            <button>Guess</button>
          </form>
        </UiModal>
      </div>
      <button
        class="rounded-lg border px-4 py-2 text-xl font-semibold hover:bg-white hover:text-black"
        @click="skipTurn"
      >
        Skip Turn
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
const { $io } = useNuxtApp();

const letterClick = ref(false);
const wordClick = ref(false);

const guessedLetter = ref("");
const guessedWord = ref("");

const guessLetter = () => {
  //get the guessed letter
  //send the guessed letter to the server
  $io.emit(ClientEvents.GUESS_LETTER, guessedLetter.value);
  //close the modal
  letterClick.value = false;
  guessedLetter.value = "";
};
const guessWord = () => {
  $io.emit(ClientEvents.GUESS_WORD, guessedWord.value);
  //close the modal
  wordClick.value = false;
  guessedWord.value = "";
};
const skipTurn = () => {
  $io.emit(ClientEvents.SKIP_TURN);
};
</script>
