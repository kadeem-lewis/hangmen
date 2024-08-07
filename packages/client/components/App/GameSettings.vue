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
        <USelectMenu
          v-model="wordsPerGame"
          class="w-full"
          :options="wordOptions"
        />
      </UFormGroup>
      <UFormGroup class="flex justify-between">
        <template #label>
          <label class="text-lg">Max word Length:</label>
        </template>
        <USelectMenu
          v-model="wordLength"
          class="w-full"
          :options="wordLengthOptions"
        />
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
const wordOptions = Array.from(
  { length: maxWordsPerGame - minWordsPerGame + 1 },
  (_, i) => String(i + minWordsPerGame),
);

const wordLength = ref(8);
const maxWordLength = 24;
const minWordLength = 8;
const wordLengthOptions = Array.from(
  { length: maxWordLength - minWordLength + 1 },
  (_, i) => String(i + minWordLength),
);
const isHardMode = ref(false);

const gameSettings = useState("settings", () => ({
  wordsPerGame: wordsPerGame.value,
  minWordLength: wordLength.value,
  isHardMode: isHardMode.value,
}));
</script>
