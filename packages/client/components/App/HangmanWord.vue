<template>
  <div class="flex justify-center gap-1 text-lg font-bold uppercase">
    <span
      v-for="(letter, index) in wordToGuess"
      :key="index"
      class="border-b-2 border-solid border-current font-short-stack"
    >
      <span :class="{ invisible: letter === '_' }"> {{ letter }}</span>
    </span>
    <span class="ml-2 text-xs">{{ wordToGuess.length }}</span>
  </div>
</template>

<script setup lang="ts">
const { wordToGuess } = storeToRefs(useGameStore());
</script>
