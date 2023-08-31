<template>
  <div class="flex h-full flex-col justify-between">
    <AppHangmanWord />
    <AppHangmanCanvas />
    <div class="flex">
      <div>
        <button
          class="m-2 w-1/3 rounded-full bg-blue-600 py-2 text-xl font-semibold hover:bg-blue-500"
          @click="letterClick = true"
        >
          Guess Letter
        </button>
        <UModal v-model="letterClick">Hello</UModal>
      </div>
      <div>
        <button
          class="m-2 w-1/3 rounded-full bg-blue-600 py-2 text-xl font-semibold hover:bg-blue-500"
          @click="wordClick = true"
        >
          Guess Word
        </button>
        <UModal v-model="wordClick">Howdy</UModal>
      </div>
      <button
        class="m-2 w-1/3 rounded-full bg-blue-600 py-2 text-xl font-semibold hover:bg-blue-500"
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
