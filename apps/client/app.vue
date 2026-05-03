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
    class: " bg-dark-mode-600 min-h-screen box-border text-white",
  },
});
const { $io } = useNuxtApp();
const connectionStore = useConnectionStore();
const roomStore = useRoomStore();
const gameStore = useGameStore();

$io.off();

gameStore.bindEvents();
roomStore.bindEvents();
connectionStore.bindEvents();

// Most of these should eventually be moved to connection store
$io.onAny((event, ...args) => {
  console.log(event, args);
});

$io.onAnyOutgoing((event, ...args) => {
  console.log(event, args);
});

$io.on("disconnect", (reason) => {
  if (reason === "io server disconnect") {
    navigateTo({
      path: "/",
    });
  }
});
</script>
