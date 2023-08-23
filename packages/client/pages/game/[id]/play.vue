<template>
  <div>The Game</div>
  <div class="flex">
    <button
      class="m-2 w-1/3 rounded-full bg-blue-600 py-2 text-xl font-semibold hover:bg-blue-500"
      @click="guessLetter"
    >
      Guess Letter
    </button>
    <button
      class="m-2 w-1/3 rounded-full bg-blue-600 py-2 text-xl font-semibold hover:bg-blue-500"
      @click="guessWord"
    >
      Guess Word
    </button>
    <button
      class="m-2 w-1/3 rounded-full bg-blue-600 py-2 text-xl font-semibold hover:bg-blue-500"
      @click="skipTurn"
    >
      Skip Turn
    </button>
  </div>
</template>
<script setup lang="ts">
const { $io } = useNuxtApp();
const guessLetter = () => {};
const guessWord = () => {};
const skipTurn = () => {};
</script>
