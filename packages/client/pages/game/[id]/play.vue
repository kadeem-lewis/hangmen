<template>
  <div class="flex h-full flex-col justify-between gap-4">
    <div class="grid gap-4">
      <AppHangmanCanvas />
      <input type="text" />
      <AppGameKeyboard />
    </div>
    <div class="flex justify-between gap-4">
      <button class="btn text-xs lg:text-base" @click="skipTurn">
        Skip Turn
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
const { $io } = useNuxtApp();

const skipTurn = () => {
  $io.emit(ClientEvents.SKIP_TURN);
};
</script>
