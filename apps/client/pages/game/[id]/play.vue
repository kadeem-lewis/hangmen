<template>
  <UCard class="grid gap-4">
    <AppHangmanCanvas />
    <div>
      <p v-for="(letter, index) in guessedLetters" :key="`${letter}-${index}`">
        {{ letter }}
      </p>
    </div>
    <template #footer>
      <!-- The 3 buttons for guess letter, guess word and skip that opens modals might be a better solution -->
      <UInput
        v-model="guess"
        placeholder="Guess letter or word"
        :disabled="players.get($io.id!)?.isGuesser === false"
      />
      <UButton @click="handleGuess">Guess</UButton>
      <UButton @click="skipTurn">Skip Turn</UButton>
    </template>
  </UCard>
</template>
<script setup lang="ts">
const { $io } = useNuxtApp();
const { skipTurn, sendGuess } = useGameStore();
const { guessedLetters } = storeToRefs(useGameStore());
const { players } = storeToRefs(useRoomStore());

const guess = ref<string>("");

function handleGuess() {
  if (guess.value === "") return;
  sendGuess(guess.value.charAt(0));
  guess.value = "";
}

//TODO: currently conflicts with leave game button if on play page, should be modal
onBeforeRouteLeave(() => {
  const answer = window.confirm(
    "Do you really want to leave? you have unsaved changes!",
  );
  if (!answer) return false;
});
</script>
