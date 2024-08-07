<template>
  <UCard class="grid gap-4">
    <AppHangmanCanvas />
    <template #footer>
      <UInput placeholder="Guess letter or word" />
      <UButton>Guess</UButton>
      <UButton @click="skipTurn">Skip Turn</UButton>
    </template>
  </UCard>
</template>
<script setup lang="ts">
const { skipTurn } = useGameStore();

//TODO: currently conflicts with leave game button if on play page, should be modal
onBeforeRouteLeave(() => {
  const answer = window.confirm(
    "Do you really want to leave? you have unsaved changes!",
  );
  if (!answer) return false;
});
</script>
