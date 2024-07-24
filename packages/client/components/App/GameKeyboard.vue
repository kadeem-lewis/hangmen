<template>
  <div class="grid grid-cols-9 gap-2 text-center uppercase">
    <button
      v-for="letter in alphabet"
      :key="letter"
      :disabled="false"
      class="rounded-lg border font-short-stack hover:bg-white hover:text-black disabled:border-gray-400"
    >
      {{ letter }}
    </button>
    <button
      class="rounded-lg border font-short-stack hover:bg-white hover:text-black disabled:border-gray-400"
      @click="submitGuess"
    >
      Enter
    </button>
  </div>
</template>

<script setup lang="ts">
const { $io } = useNuxtApp();

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
const guessedWord = useState<string[]>("guessedWord");

//TODO: on screen keyboard isnt compatible with pin input because it currently has no way to access the index

const submitGuess = () => {
  $io.emit(ClientEvents.SEND_GUESS, guessedWord.value[0]);
};
</script>
