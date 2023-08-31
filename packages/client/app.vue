<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
useHead({
  title: "Hangmen | Multiplayer Hangman",
  meta: [
    {
      name: "description",
      content:
        "A multiplayer hangman game where players compete against each other to see who can make the most correct guesses. ",
    },
  ],
  bodyAttrs: {
    class: " bg-gray-950 min-h-screen box-border text-white",
  },
});
const { $io } = useNuxtApp();

$io.connect();

$io.onAny((event, ...args) => {
  console.log(event, args);
});
</script>
