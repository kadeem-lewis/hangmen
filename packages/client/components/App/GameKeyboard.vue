<template>
  <div class="grid grid-cols-9 gap-2 text-center uppercase">
    <button
      v-for="letter in alphabet"
      :key="letter"
      :disabled="true"
      class="rounded-lg border font-short-stack hover:bg-white hover:text-black disabled:border-gray-400"
    >
      {{ letter }}
    </button>
  </div>
</template>

<script setup lang="ts">
const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
</script>
