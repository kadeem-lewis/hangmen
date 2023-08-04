<template>
  <header class="flex justify-between md:justify-center my-4 items-center">
    <NuxtLink to="/">
      <img src="../assets/logo.svg" alt="Hangman Logo" class="h-12" />
    </NuxtLink>
    <button class="md:hidden">
      <ExclamationCircleIcon class="h-8 w-8" />
    </button>
  </header>
</template>
<script setup lang="ts">
import { ExclamationCircleIcon } from "@heroicons/vue/24/solid";
</script>
