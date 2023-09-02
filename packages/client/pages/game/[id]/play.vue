<template>
  <div class="flex h-full flex-col justify-between">
    <AppHangmanWord />
    <AppHangmanCanvas />
    <div class="flex justify-between">
      <div>
        <button
          class="rounded-full bg-blue-600 px-4 py-2 text-xl font-semibold hover:bg-blue-500"
          @click="letterClick = true"
        >
          Guess Letter
        </button>
        <UiModal v-model="letterClick" title="Guess Letter">
          <label for="letterGuess">letter</label>
          <input type="text" />
        </UiModal>
      </div>
      <div>
        <button
          class="rounded-full bg-blue-600 px-4 py-2 text-xl font-semibold hover:bg-blue-500"
          @click="wordClick = true"
        >
          Guess Word
        </button>
        <UiModal v-model="wordClick" title="Guess Word">
          <label for="letterGuess">Word</label>
          <input type="text"
        /></UiModal>
      </div>
      <button
        class="rounded-full bg-blue-600 px-4 py-2 text-xl font-semibold hover:bg-blue-500"
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

const guessLetter = () => {};
const guessWord = () => {};
const skipTurn = () => {};
</script>
