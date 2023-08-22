<template>
  <div>
    <NavBar />
    <main class="mt-16 max-w-md md:max-w-5xl m-auto">
      <NuxtPage />
    </main>
  </div>
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
    class: " bg-dark-mode-600 min-h-screen box-border text-white",
  },
});
const { $io } = useNuxtApp();

$io.connect();
</script>
