<template>
  <div>
    <form class="space-y-4">
      <UCheckbox
        id="hard-mode"
        v-model="isHardMode"
        name="hard-mode"
        label="Hard Mode:"
      />
      <UFormGroup class="flex justify-between">
        <template #label>
          <label class="text-lg">Words per Game:</label>
        </template>
        <USelectMenu v-model="wordsPerGame" class="w-full" />
      </UFormGroup>
      <UFormGroup class="flex justify-between">
        <template #label>
          <label class="text-lg">Max word Length:</label>
        </template>
        <USelectMenu v-model="wordLength" class="w-full" />
      </UFormGroup>
    </form>
    <div><slot /></div>
  </div>
  <!-- TODO: add a slot in settings to wrap and style game code  -->
</template>

<script setup lang="ts">
const { $io } = useNuxtApp();

const wordsPerGame = ref(3);
const minWordsPerGame = 3;
const maxWordsPerGame = 9;

const wordLength = ref(8);
const maxWordLength = 24;
const minWordLength = 8;
const isHardMode = ref(false);

const gameSettings = useState("settings", () => ({
  wordsPerGame: wordsPerGame.value,
  minWordLength: wordLength.value,
  isHardMode: isHardMode.value,
}));
</script>
