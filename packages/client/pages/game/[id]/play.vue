<template>
  <div>The Game</div>
  <div class="flex">
    <button
      class="rounded-full bg-blue-600 py-2 hover:bg-blue-500 m-2 font-semibold text-xl w-1/3"
      @click="guessLetter"
    >
      Guess Letter
    </button>
    <button
      class="rounded-full bg-blue-600 py-2 hover:bg-blue-500 m-2 font-semibold text-xl w-1/3"
      @click="guessWord"
    >
      Guess Word
    </button>
    <button
      class="rounded-full bg-blue-600 py-2 hover:bg-blue-500 m-2 font-semibold text-xl w-1/3"
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
