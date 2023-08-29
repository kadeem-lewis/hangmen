<template>
  <div class="flex justify-center gap-1 text-2xl font-bold uppercase">
    <span
      v-for="(letter, index) in word"
      :key="index"
      class="border-b-2 border-solid border-current"
    >
      <span :class="guessedLetters.includes(letter) ? 'visible' : 'invisible'">
        {{ letter }}</span
      >
    </span>
  </div>
</template>

<script setup lang="ts">
const word = ref("soon");
const guessedLetters = ref(["s", "n"]);
</script>
