<template>
  <div class="flex h-full flex-col justify-between">
    <AppHangmanWord />
    <AppHangmanCanvas />
    <div class="flex">
      <div>
        <UButton
          class="m-2 rounded-full bg-blue-600 py-2 text-xl font-semibold hover:bg-blue-500"
          @click="letterClick = true"
        >
          Guess Letter
        </UButton>
        <UModal v-model="letterClick">Hello</UModal>
      </div>
      <div>
        <UButton
          class="m-2 rounded-full bg-blue-600 py-2 text-xl font-semibold hover:bg-blue-500"
          @click="wordClick = true"
        >
          Guess Word
        </UButton>
        <UModal v-model="wordClick">Howdy</UModal>
      </div>
      <UButton
        class="m-2 w-1/3 rounded-full bg-blue-600 py-2 text-xl font-semibold hover:bg-blue-500"
        @click="skipTurn"
      >
        Skip Turn
      </UButton>
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
