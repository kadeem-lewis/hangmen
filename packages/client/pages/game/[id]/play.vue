<template>
  <div class="grid gap-4">
    <AppHangmanCanvas />
    <UiPinInput v-model="guessedWord" :length="wordToGuess.length" />
  </div>
  <!-- <div class="flex justify-between gap-4">
      <button
        class="btn w-fit self-start text-xs lg:text-base"
        @click="skipTurn"
      >
        Skip Turn
      </button>
    </div> -->
</template>
<script setup lang="ts">
const { $io } = useNuxtApp();

const wordToGuess = useState<string[]>("wordToGuess");
const guessedWord = useState<string[]>("guessedWord");

const skipTurn = () => {
  $io.emit(ClientEvents.SKIP_TURN);
};

onMounted(() => {
  $io.on(ServerEvents.GAME_UPDATE, (word) => {
    wordToGuess.value = word;
  });
});

//TODO: currently conflicts with leave game button if on play page, should be modal
onBeforeRouteLeave(() => {
  const answer = window.confirm(
    "Do you really want to leave? you have unsaved changes!",
  );
  if (!answer) return false;
});
</script>
