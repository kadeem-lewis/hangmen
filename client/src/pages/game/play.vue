<template>
  <div class="flex flex-col">
    <div>
      <span><ClockIcon class="h-6 w-6" /></span>
      <span>30s</span>
    </div>
    <p class="text-center text-3xl">Player's Turn</p>
  </div>
  <div>The Game</div>
  <div class="flex">
    <button
      class="rounded-full bg-blue-600 py-2 hover:bg-blue-500 m-2 font-semibold text-xl w-1/3"
    >
      Guess Letter
    </button>
    <button
      class="rounded-full bg-blue-600 py-2 hover:bg-blue-500 m-2 font-semibold text-xl w-1/3"
    >
      Guess Word
    </button>
    <button
      class="rounded-full bg-blue-600 py-2 hover:bg-blue-500 m-2 font-semibold text-xl w-1/3"
    >
      Skip Turn
    </button>
  </div>
</template>
<script setup lang="ts">
import { ClockIcon } from "@heroicons/vue/24/solid";
</script>
